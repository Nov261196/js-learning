import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { clearSessionCookie, createSession, requireAuth, setSessionCookie } from "./auth.js";
import { initializeDatabase, pool } from "./db.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT ?? 3000);
const publicDirectory = process.env.PUBLIC_DIR ?? path.resolve(here, "../../..");

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be set to at least 32 characters.");
}

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "512kb" }));
app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Bạn thử quá nhiều lần. Hãy đợi một lúc rồi thử lại." },
});

function cleanEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function publicUser(row) {
  return { id: row.id, name: row.name, email: row.email };
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validProgress(value) {
  if (!isPlainObject(value)) return false;
  if (!Array.isArray(value.completed) || !Array.isArray(value.completedLessons)) return false;
  if (!isPlainObject(value.code) || !isPlainObject(value.lessonCode) || !isPlainObject(value.checklists)) return false;
  return JSON.stringify(value).length <= 450_000;
}

app.get("/api/health", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.json({ status: "ok", database: "ok" });
  } catch {
    response.status(503).json({ status: "error", database: "unavailable" });
  }
});

app.post("/api/auth/signup", authLimiter, async (request, response, next) => {
  const name = typeof request.body.name === "string" ? request.body.name.trim() : "";
  const email = cleanEmail(request.body.email);
  const password = typeof request.body.password === "string" ? request.body.password : "";

  if (name.length < 2 || name.length > 80) {
    return response.status(400).json({ message: "Tên cần có từ 2 đến 80 ký tự." });
  }
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return response.status(400).json({ message: "Email chưa đúng định dạng." });
  }
  if (password.length < 8 || password.length > 128) {
    return response.status(400).json({ message: "Mật khẩu cần có từ 8 đến 128 ký tự." });
  }

  try {
    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      "INSERT INTO users (id, name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
      [id, name, email, passwordHash],
    );
    const user = publicUser(rows[0]);
    setSessionCookie(response, createSession(user.id));
    return response.status(201).json({ user });
  } catch (error) {
    if (error.code === "23505") {
      return response.status(409).json({ message: "Email này đã được đăng ký." });
    }
    return next(error);
  }
});

app.post("/api/auth/login", authLimiter, async (request, response, next) => {
  const email = cleanEmail(request.body.email);
  const password = typeof request.body.password === "string" ? request.body.password : "";
  if (!email || !password) {
    return response.status(400).json({ message: "Nhập email và mật khẩu để đăng nhập." });
  }

  try {
    const { rows } = await pool.query(
      "SELECT id, name, email, password_hash FROM users WHERE email = $1",
      [email],
    );
    const row = rows[0];
    if (!row || !(await bcrypt.compare(password, row.password_hash))) {
      return response.status(401).json({ message: "Email hoặc mật khẩu không đúng." });
    }
    const user = publicUser(row);
    setSessionCookie(response, createSession(user.id));
    return response.json({ user });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/auth/logout", (_request, response) => {
  clearSessionCookie(response);
  response.status(204).end();
});

app.get("/api/auth/me", requireAuth, async (request, response, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [request.userId],
    );
    if (!rows[0]) {
      clearSessionCookie(response);
      return response.status(401).json({ message: "Tài khoản không còn tồn tại." });
    }
    return response.json({ user: publicUser(rows[0]) });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/progress", requireAuth, async (request, response, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT completed, completed_lessons, code, lesson_code, checklists FROM user_progress WHERE user_id = $1",
      [request.userId],
    );
    const progress = rows[0];
    return response.json(progress ? {
      completed: progress.completed,
      completedLessons: progress.completed_lessons,
      code: progress.code,
      lessonCode: progress.lesson_code,
      checklists: progress.checklists,
    } : {
      completed: [],
      completedLessons: [],
      code: {},
      lessonCode: {},
      checklists: {},
    });
  } catch (error) {
    return next(error);
  }
});

app.put("/api/progress", requireAuth, async (request, response, next) => {
  const progress = request.body;
  if (!validProgress(progress)) {
    return response.status(400).json({ message: "Dữ liệu tiến độ không hợp lệ hoặc quá lớn." });
  }

  try {
    await pool.query(
      `INSERT INTO user_progress (user_id, completed, completed_lessons, code, lesson_code, checklists, updated_at)
       VALUES ($1, $2::jsonb, $3::jsonb, $4::jsonb, $5::jsonb, $6::jsonb, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         completed = EXCLUDED.completed,
         completed_lessons = EXCLUDED.completed_lessons,
         code = EXCLUDED.code,
         lesson_code = EXCLUDED.lesson_code,
         checklists = EXCLUDED.checklists,
         updated_at = NOW()`,
      [request.userId, JSON.stringify(progress.completed), JSON.stringify(progress.completedLessons), JSON.stringify(progress.code), JSON.stringify(progress.lessonCode), JSON.stringify(progress.checklists)],
    );
    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
});

app.use("/api", (_request, response) => {
  response.status(404).json({ message: "Không tìm thấy API này." });
});

app.use(express.static(publicDirectory, { extensions: ["html"] }));
app.get("/", (_request, response) => {
  response.redirect("/learning_code/exercise-app/index.html");
});

app.use((error, _request, response, _next) => {
  console.error(error);
  if (response.headersSent) return;
  response.status(500).json({ message: "Máy chủ gặp lỗi. Hãy thử lại sau." });
});

await initializeDatabase();
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`VUDN API listening on port ${port}`);
});

async function shutdown() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

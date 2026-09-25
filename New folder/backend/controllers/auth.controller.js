import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, findUserById } from "../lib/user.repository.js";
import {
  clearSessionCookie,
  createSession,
  setSessionCookie,
} from "../utils/session.js";
import { toPublicUser } from "../utils/user.presenter.js";

function cleanEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export async function signup(request, response, next) {
  const body = request.body ?? {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = cleanEmail(body.email);
  const password = typeof body.password === "string" ? body.password : "";

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
    const user = await createUser({
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12),
    });
    setSessionCookie(response, createSession(user.id));
    return response.status(201).json({ user: toPublicUser(user) });
  } catch (error) {
    if (error.code === "P2002") {
      return response.status(409).json({ message: "Email này đã được đăng ký." });
    }
    return next(error);
  }
}

export async function login(request, response, next) {
  const body = request.body ?? {};
  const email = cleanEmail(body.email);
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) {
    return response.status(400).json({ message: "Nhập email và mật khẩu để đăng nhập." });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return response.status(401).json({ message: "Email hoặc mật khẩu không đúng." });
    }
    setSessionCookie(response, createSession(user.id));
    return response.json({ user: toPublicUser(user) });
  } catch (error) {
    return next(error);
  }
}

export function logout(_request, response) {
  clearSessionCookie(response);
  response.status(204).end();
}

export async function getCurrentUser(request, response, next) {
  try {
    const user = await findUserById(request.userId);
    if (!user) {
      clearSessionCookie(response);
      return response.status(401).json({ message: "Tài khoản không còn tồn tại." });
    }
    return response.json({ user: toPublicUser(user) });
  } catch (error) {
    return next(error);
  }
}

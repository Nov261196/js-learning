import jwt from "jsonwebtoken";

const COOKIE_NAME = "practice_lab_session";
const SESSION_DAYS = 7;

export function createSession(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: `${SESSION_DAYS}d`,
  });
}

export function setSessionCookie(response, token) {
  response.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api",
    maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
  });
}

export function clearSessionCookie(response) {
  response.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api",
  });
}

export function requireAuth(request, response, next) {
  const token = request.cookies?.[COOKIE_NAME];
  if (!token) {
    return response.status(401).json({ message: "Hãy đăng nhập để tiếp tục." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    request.userId = payload.sub;
    return next();
  } catch {
    clearSessionCookie(response);
    return response.status(401).json({ message: "Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại." });
  }
}

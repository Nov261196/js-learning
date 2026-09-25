import jwt from "jsonwebtoken";

const COOKIE_NAME = "practice_lab_session";
const SESSION_DAYS = 7;

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api",
});

export function createSession(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: `${SESSION_DAYS}d`,
  });
}

export function verifySession(token) {
  return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
}

export function getSessionToken(request) {
  return request.cookies?.[COOKIE_NAME];
}

export function setSessionCookie(response, token) {
  response.cookie(COOKIE_NAME, token, {
    ...cookieOptions(),
    maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
  });
}

export function clearSessionCookie(response) {
  response.clearCookie(COOKIE_NAME, cookieOptions());
}

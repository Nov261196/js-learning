import {
  clearSessionCookie,
  getSessionToken,
  verifySession,
} from "../utils/session.js";

export function requireAuth(request, response, next) {
  const token = getSessionToken(request);
  if (!token) {
    return response.status(401).json({ message: "Hãy đăng nhập để tiếp tục." });
  }

  try {
    const payload = verifySession(token);
    request.userId = payload.sub;
    return next();
  } catch {
    clearSessionCookie(response);
    return response.status(401).json({ message: "Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại." });
  }
}

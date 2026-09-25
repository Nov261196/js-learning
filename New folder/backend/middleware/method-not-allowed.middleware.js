const allowedMethods = new Map([
  ["/health", ["GET"]],
  ["/auth/signup", ["POST"]],
  ["/auth/login", ["POST"]],
  ["/auth/logout", ["POST"]],
  ["/auth/me", ["GET"]],
  ["/progress", ["GET", "PUT"]],
  ["/progress/", ["GET", "PUT"]],
]);

export function handleUnsupportedApiMethod(request, response, next) {
  const methods = allowedMethods.get(request.path);
  if (!methods) return next();

  const allow = [...methods, "OPTIONS"];
  response.set("Allow", allow.join(", "));

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  return response.status(405).json({
    message: `Phương thức ${request.method} không được hỗ trợ cho API này.`,
    allowedMethods: methods,
  });
}

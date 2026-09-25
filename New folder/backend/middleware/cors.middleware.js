function isAllowedDevelopmentOrigin(origin) {
  try {
    const { hostname, protocol } = new URL(origin);
    return ["http:", "https:"].includes(protocol)
      && (hostname === "localhost"
        || hostname === "127.0.0.1"
        || hostname.endsWith(".test"));
  } catch {
    return false;
  }
}

function configuredOrigins() {
  return new Set(
    (process.env.FRONTEND_ORIGINS ?? "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

export function allowFrontendOrigin(request, response, next) {
  const origin = request.get("Origin");
  const allowed = origin
    && (configuredOrigins().has(origin) || isAllowedDevelopmentOrigin(origin));

  if (allowed) {
    response.set("Access-Control-Allow-Origin", origin);
    response.set("Access-Control-Allow-Credentials", "true");
    response.set("Access-Control-Allow-Headers", "Content-Type, Accept");
    response.set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
    response.vary("Origin");
  }

  if (request.method === "OPTIONS" && allowed) {
    return response.status(204).end();
  }

  return next();
}

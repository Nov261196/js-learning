export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function apiUrl(path) {
  if (!path.startsWith("/api/") || location.port === "3000") return path;
  const configuredOrigin = globalThis.VUDN_API_ORIGIN;
  const origin = configuredOrigin
    ? configuredOrigin.replace(/\/$/, "")
    : `http://${location.hostname || "127.0.0.1"}:3000`;
  return `${origin}${path}`;
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers ?? {});
  headers.set("Accept", "application/json");
  if (options.body !== undefined) headers.set("Content-Type", "application/json");

  let response;
  try {
    response = await fetch(apiUrl(path), { ...options, headers, credentials: "include" });
  } catch {
    throw new ApiError("Không kết nối được máy chủ. Hãy kiểm tra server rồi thử lại.");
  }

  if (response.status === 204) return null;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(payload.message ?? `Yêu cầu thất bại (${response.status}).`, response.status);
  }
  return payload;
}

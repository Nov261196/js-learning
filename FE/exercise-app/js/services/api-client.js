export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers ?? {});
  headers.set("Accept", "application/json");
  if (options.body !== undefined) headers.set("Content-Type", "application/json");

  let response;
  try {
    response = await fetch(path, {
      ...options,
      headers,
      credentials: "same-origin",
    });
  } catch {
    throw new Error("Không kết nối được máy chủ. Hãy kiểm tra Docker đang chạy rồi thử lại.");
  }

  if (response.status === 204) return null;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message ?? `Yêu cầu thất bại (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return payload;
}

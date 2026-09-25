export function notFoundApi(_request, response) {
  response.status(404).json({ message: "Không tìm thấy API này." });
}

export function handleError(error, _request, response, _next) {
  console.error(error);
  if (response.headersSent) return;
  response.status(500).json({ message: "Máy chủ gặp lỗi. Hãy thử lại sau." });
}

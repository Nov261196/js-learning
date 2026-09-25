import { apiRequest } from "./api.service.js";

let pendingSave = Promise.resolve();

export async function fetchProgress() {
  return apiRequest("/api/progress");
}

export function persistProgress(progress) {
  const body = JSON.stringify(progress);
  pendingSave = pendingSave
    .catch(() => undefined)
    .then(() => apiRequest("/api/progress", { method: "PUT", body }));
  return pendingSave;
}

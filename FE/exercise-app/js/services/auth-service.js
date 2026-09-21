import { apiRequest } from "./api-client.js";

export async function currentUser() {
  try {
    const result = await apiRequest("/api/auth/me");
    return result.user;
  } catch (error) {
    if (error.status === 401) return null;
    throw error;
  }
}

export async function signIn(email, password) {
  const result = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return result.user;
}

export async function signUp({ name, email, password, confirmPassword }) {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  if (cleanName.length < 2) throw new Error("Tên cần có ít nhất 2 ký tự.");
  if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) throw new Error("Email chưa đúng định dạng.");
  if (password.length < 8) throw new Error("Mật khẩu cần có ít nhất 8 ký tự.");
  if (password !== confirmPassword) throw new Error("Hai mật khẩu chưa giống nhau.");

  const result = await apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name: cleanName, email: cleanEmail, password }),
  });
  return result.user;
}

export async function signOut() {
  await apiRequest("/api/auth/logout", { method: "POST" });
}

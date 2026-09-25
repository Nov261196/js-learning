import { apiRequest } from "../services/api.service.js";

export class UserModel {
  user = null;

  async restoreSession() {
    try {
      const { user } = await apiRequest("/api/auth/me");
      this.user = user;
    } catch (error) {
      if (error.status !== 401) throw error;
      this.user = null;
    }
    return this.user;
  }

  async login(email, password) {
    const result = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.user = result.user;
    return this.user;
  }

  async register({ name, email, password, confirmPassword }) {
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
    this.user = result.user;
    return this.user;
  }

  async logout() {
    await apiRequest("/api/auth/logout", { method: "POST" });
    this.user = null;
  }
}

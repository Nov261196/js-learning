const USERS_KEY = "javascript-practice-users-v1";
const SESSION_KEY = "javascript-practice-session-v1";

function readUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hashBuffer), byte => byte.toString(16).padStart(2, "0")).join("");
}

function createId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getCurrentUser() {
  const userId = localStorage.getItem(SESSION_KEY);
  if (!userId) return null;
  return readUsers().find(user => user.id === userId) ?? null;
}

export async function register({ name, email, password, confirmPassword }) {
  const cleanName = name.trim();
  const cleanEmail = normalizeEmail(email);

  if (cleanName.length < 2) throw new Error("Tên cần có ít nhất 2 ký tự.");
  if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) throw new Error("Email chưa đúng định dạng.");
  if (password.length < 6) throw new Error("Mật khẩu cần có ít nhất 6 ký tự.");
  if (password !== confirmPassword) throw new Error("Hai mật khẩu chưa giống nhau.");

  const users = readUsers();
  if (users.some(user => user.email === cleanEmail)) throw new Error("Email này đã được đăng ký.");

  const user = {
    id: createId(),
    name: cleanName,
    email: cleanEmail,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, user.id);
  return user;
}

export async function login({ email, password }) {
  const cleanEmail = normalizeEmail(email);
  const passwordHash = await hashPassword(password);
  const user = readUsers().find(item => item.email === cleanEmail && item.passwordHash === passwordHash);

  if (!user) throw new Error("Email hoặc mật khẩu không đúng.");
  localStorage.setItem(SESSION_KEY, user.id);
  return user;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

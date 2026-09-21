// Validator — kiem tra du lieu dau vao
export const isValidId = (id) => {
  // Ma SV phai bat dau bang "SV" va co it nhat 4 ky tu
  return typeof id === "string" && id.startsWith("SV") && id.length >= 4;
};
export const isValidName = (name) => {
  // Ten phai co it nhat 2 ky tu (sau khi trim)
  return typeof name === "string" && name.trim().length >= 2;
};
export const isValidScore = (score) => {
  // Diem phai la so, tu 0 den 10
  return typeof score === "number" && score >= 0 && score <= 10;
};
// Kiem tra toan bo thong tin sinh vien
export const validateStudent = (id, name, score) => {
  const errors = [];
  if (!isValidId(id)) errors.push("Ma SV khong hop le (phai bat dau bang SV)");
  if (!isValidName(name)) errors.push("Ten khong hop le (it nhat 2 ky tu)");
  if (!isValidScore(score)) errors.push("Diem khong hop le (0-10)");
  return {isValid: errors.length === 0, errors};
};

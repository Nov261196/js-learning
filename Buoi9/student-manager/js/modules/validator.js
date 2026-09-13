const normalizeSpaces = (value) => String(value ?? "").trim().replace(/\s+/g, " ");

export const validateStudent = ({id, name, className, score}) => {
  const errors = [];
  const normalizedId = String(id ?? "").trim().toUpperCase();
  const normalizedName = normalizeSpaces(name);
  const normalizedClassName = normalizeSpaces(className).toUpperCase();
  const rawScore = String(score ?? "").trim();
  const normalizedScore = Number(rawScore);

  if (!/^SV\d{2,}$/.test(normalizedId)) {
    errors.push("Mã sinh viên phải có dạng SV01, SV02...");
  }

  if (normalizedName.length < 2) {
    errors.push("Họ tên phải có ít nhất 2 ký tự.");
  } else if (!/^[\p{L}\s]+$/u.test(normalizedName)) {
    errors.push("Họ tên chỉ được chứa chữ cái và khoảng trắng.");
  }

  if (normalizedClassName.length < 2) {
    errors.push("Tên lớp phải có ít nhất 2 ký tự.");
  } else if (!/^[A-Z0-9_-]+(?:\s[A-Z0-9_-]+)*$/.test(normalizedClassName)) {
    errors.push("Tên lớp chỉ được chứa chữ, số, dấu gạch ngang hoặc gạch dưới.");
  }

  if (rawScore === "" || !Number.isFinite(normalizedScore) || normalizedScore < 0 || normalizedScore > 10) {
    errors.push("Điểm phải là số từ 0 đến 10.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      id: normalizedId,
      name: normalizedName,
      className: normalizedClassName,
      score: normalizedScore,
    },
  };
};

// const rawNames = [" an ", "BÌNH", " chi", "Dũng "];

// const cleanNames = rawNames.map((name) => {
//     // 1. Loại bỏ khoảng trắng thừa ở 2 đầu
//     const trimmed = name.trim();
//     // 2. Chuyển toàn bộ chuỗi về chữ thường theo chuẩn tiếng Việt
//     const lower = trimmed.toLocaleLowerCase("vi");
//     // 3. Viết hoa ký tự đầu và ghép với phần còn lại
//     return lower.charAt(0).toLocaleUpperCase("vi") + lower.slice(1);
// });

// console.log(cleanNames);
// Output: ['An', 'Bình', 'Chi', 'Dũng']

// console.log(rawNames);
// Mảng gốc không bị thay đổi: [" an ", "BÌNH", " chi", "Dũng "]


const rawNames = [" an ", "BÌNH", " chi", "Dũng "];
const cleanNames = rawNames.map((s) =>
    (s = s.trim().toLowerCase()) && s[0].toUpperCase() + s.slice(1));
console.log(cleanNames);

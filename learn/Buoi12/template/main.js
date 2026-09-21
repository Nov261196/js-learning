// ==============================================================================
// 1. GHI DỮ LIỆU: localStorage.setItem(key, value)
// ==============================================================================
localStorage.setItem("website_name", "TechStore Pro");
localStorage.setItem("current_theme", "dark");
localStorage.setItem("view_count", "150"); // Lưu ý: Số cũng phải chuyển thành
// ==============================================================================
// 2. ĐỌC DỮ LIỆU: localStorage.getItem(key)
// ==============================================================================
const siteName = localStorage.getItem("website_name"); // "TechStore Pro"
const theme = localStorage.getItem("current_theme"); // "dark"
const notExist = localStorage.getItem("unknown_key"); // null (Nếu không tìm
console.log("Tên Web:", siteName);
console.log("Chế độ màu:", theme);
// ==============================================================================
// 3. XÓA 1 MỤC CỤ THỂ: localStorage.removeItem(key)
// ==============================================================================
localStorage.removeItem("view_count"); // Xóa khóa 'view_count'
// ==============================================================================
// 4. XÓA SẠCH TOÀN BỘ BỘ NHỚ CỦA WEBSITE: localStorage.clear()
// ==============================================================================
// localStorage.clear(); //

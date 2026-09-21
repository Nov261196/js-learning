// --- HÀM GIẢ LẬP ---
const fetchCategories = () => new Promise((res) => setTimeout(() => res(["Laptop", "Điện thoại"]), 300));
const fetchNews = () => new Promise((res) => setTimeout(() => res(["Khuyến mãi 30%", "Sản phẩm mới"]), 400));
const fetchWeather = () =>
  new Promise((res) =>
    setTimeout(
      () =>
        res({
          temp: 28,
          city: "TP.HCM",
        }),
      200,
    ),
  );
// ==========================================
// CÁCH 1: Promise.all() với .then()
// ==========================================
function loadHomePagePromise() {
  console.time("⏱ Thời gian tải (Promise.all .then)");
  Promise.all([fetchCategories(), fetchNews(), fetchWeather()]).then(([categories, news, weather]) => {
    console.timeEnd("⏱ Thời gian tải (Promise.all .then)");
    console.log("[Promise.all] Dữ liệu đã sẵn sàng:", {
      categories,
      news,
      weather,
    });
  });
}
// ==========================================
// CÁCH 2: Promise.all() kết hợp Await (Cú pháp gọn gàng nhất)
// ==========================================
async function loadHomePageAsyncAwait() {
  console.time("⏱ Thời gian tải (Promise.all await)");
  try {
    // Kích hoạt cả 3 API cùng lúc và đợi cả 3 hoàn thành
    const [categories, news, weather] = await Promise.all([fetchCategories(), fetchNews(), fetchWeather()]);
    console.timeEnd("⏱ Thời gian tải (Promise.all await)");
    console.log("[Async/Await] Dữ liệu đã sẵn sàng:", {
      categories,
      news,
      weather,
    });
  } catch (error) {
    console.error("Lỗi tải trang chủ:", error);
  }
}
// CHẠY KIỂM THỬ:
loadHomePagePromise();
setTimeout(loadHomePageAsyncAwait, 600);

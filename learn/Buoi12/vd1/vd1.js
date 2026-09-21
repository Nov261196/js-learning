// --- HÀM GIẢ LẬP GỌI MÁY CHỦ (Dùng chung cho cả 2 cách) ---
function mockFetchBook(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({
          id: 1,
          title: "Học JavaScript ES6+",
          author: "Thầy Phong",
          price: 150000,
        });
      } else {
        reject(new Error(`Không tìm thấy cuốn sách có ID #${id}`));
      }
    }, 600);
  });
}

// // ==========================================
// // CÁCH 1: Dùng Promise .then() (ES6)
// // ==========================================
// function getBookWithPromise(id) {
//     console.log("--> [Promise] Bắt đầu gọi lấy sách...");
//     mockFetchBook(id)
//         .then(book => {
//             console.log("✓ [Promise] Thành công:", book.title,
//                 `(${book.price.toLocaleString()}đ)`);
//         })
//         .catch(error => {
//             console.error("✗ [Promise] Thất bại:", error.message);
//         })
//         .finally(() => {
//             console.log("--> [Promise] Kết thúc xử lý.");
//         });
// }

// ==========================================
// CÁCH 2: Dùng Async / Await (ES2017+)
// ==========================================
async function getBookWithAsyncAwait(id) {
  console.log("--> [Async/Await] Bắt đầu gọi lấy sách...");
  try {
    const book = await mockFetchBook(id);
    console.log("✓ [Async/Await] Thành công:", book.title, `(${book.price.toLocaleString()}đ)`);
  } catch (error) {
    console.error("✗ [Async/Await] Thất bại:", error.message);
  } finally {
    console.log("--> [Async/Await] Kết thúc xử lý.");
  }
}

// CHẠY KIỂM THỬ:
// getBookWithPromise(1);
getBookWithAsyncAwait(1);

console.time("DoThoiGian");

// Đoạn code cần đo
for (let i = 0; i < 1000000; i++) {
  // làm gì đó
}

console.timeEnd("DoThoiGian");

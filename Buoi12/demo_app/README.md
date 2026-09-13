# 🚀 TechStore Admin Dashboard
> **Dự án mẫu thực hành JavaScript Nâng Cao:** Quản lý sản phẩm với **Fetch API**, **Async/Await** và **JSON-Server v1.x**.

---

## 📌 1. Giới thiệu
Dự án được xây dựng phục vụ học tập và giảng dạy môn Lập trình JavaScript. Ứng dụng minh họa kiến trúc phân tầng rõ ràng giữa **UI Controller** (`app.js`) và **API Service** (`api.js`), giao tiếp với Backend Mock REST API qua **JSON-Server** phiên bản mới nhất.

### ✨ Các tính năng chính:
- 🟢 **Kiểm tra trạng thái máy chủ (Health Check):** Tự động phát hiện server online/offline.
- 📄 **Xem danh sách & Phân trang (Pagination):** Hiển thị dữ liệu kèm hiệu ứng Skeleton Loading.
- 🔍 **Tìm kiếm thông minh (Debounce Search):** Tự động hủy request cũ bằng `AbortController` khi người dùng gõ liên tục.
- 🏷️ **Lọc & Sắp xếp:** Lọc theo danh mục, sắp xếp giá tăng/giảm, đánh giá sao.
- ➕ **Thêm mới sản phẩm (POST):** Modal form có validate dữ liệu.
- ✏️ **Cập nhật sản phẩm (PUT / PATCH):** Sửa thông tin hoặc đổi trạng thái tồn kho tức thì.
- 🗑️ **Xóa sản phẩm (DELETE):** Hộp thoại xác nhận trước khi xóa bản ghi.

---

## 🛠️ 2. Cài đặt & Khởi chạy (Dành cho sinh viên)

### Yêu cầu:
- Đã cài đặt **Node.js** (Khuyến nghị phiên bản 18 trở lên).

### Các bước thực hiện:

1. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

2. **Khởi động ứng dụng (API + Giao diện Web):**
   ```bash
   npm start
   ```
   > 💡 *JSON-Server v1.x đã được cấu hình tích hợp sẵn Web Server tĩnh (`--static .`).*

3. **Mở trình duyệt và truy cập:**
   👉 **`http://localhost:3000`**

*(Tùy chọn: Nếu muốn chỉ chạy riêng API JSON-Server không kèm web tĩnh, dùng lệnh: `npm run api-only`)*

---

## 📂 3. Cấu trúc thư mục

```text
demo_app/
├── index.html          # Giao diện chính Dashboard
├── css/
│   └── style.css       # Toàn bộ CSS giao diện hiện đại
├── js/
│   ├── api.js          # Module API Service (Fetch, Async/Await, chuẩn RESTful)
│   └── app.js          # Module UI Controller (Quản lý DOM, State, Event listeners)
├── db.json             # Cơ sở dữ liệu Mock (Products, Categories, Reviews,...)
├── package.json        # Cấu hình dự án & Scripts
└── README.md           # Tài liệu hướng dẫn
```

---

## 📖 4. Bảng tổng hợp ánh xạ REST API & Async/Await

| Thao tác | HTTP Method | Endpoint | Hàm trong `api.js` |
| :--- | :---: | :--- | :--- |
| **Lấy danh sách** | `GET` | `/products?_page=1&_per_page=4` | `ApiService.getProducts()` |
| **Chi tiết sản phẩm** | `GET` | `/products/:id` | `ApiService.getProductById(id)` |
| **Danh sách danh mục** | `GET` | `/categories` | `ApiService.getCategories()` |
| **Thêm mới** | `POST` | `/products` | `ApiService.createProduct(data)` |
| **Cập nhật toàn bộ** | `PUT` | `/products/:id` | `ApiService.updateProduct(id, data)` |
| **Cập nhật một phần** | `PATCH` | `/products/:id` | `ApiService.patchProduct(id, partialData)` |
| **Xóa sản phẩm** | `DELETE` | `/products/:id` | `ApiService.deleteProduct(id)` |
| **Kiểm tra kết nối** | `GET` | `/categories?_limit=1` | `ApiService.checkHealth()` |

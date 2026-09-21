# JavaScript Practice Lab

Ứng dụng trình duyệt để thực hành bài `Data Types và typeof`.

## Chức năng

- Đọc mục đích và yêu cầu của từng bài.
- Xem kiến thức đó được dùng ở đâu trong dự án thực tế.
- Viết và chạy JavaScript ngay trên trang.
- Xem output hoặc lỗi trong console tích hợp.
- Kiểm tra bài tự động.
- Xem gợi ý và lời giải có giải thích.
- Tự lưu code và tiến độ bằng `localStorage`.
- Dừng code tự động nếu chạy quá hai giây.

## Cách chạy

Do app sử dụng ES Modules và Web Worker, hãy chạy bằng local server.

### Cách 1 - VS Code Live Server

1. Mở folder `exercise-app` trong VS Code.
2. Nhấn chuột phải vào `index.html`.
3. Chọn **Open with Live Server**.

### Cách 2 - Vite

Chạy tại thư mục `exercise-app`:

```bash
npx vite
```

Sau đó mở địa chỉ Vite hiển thị trong terminal.

## Cấu trúc

```text
exercise-app/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── exercises.js
    └── runner.js
```

- `exercises.js`: nội dung, test, gợi ý và lời giải của bài tập.
- `app.js`: giao diện, tiến độ và điều khiển chạy code.
- `runner.js`: chạy code trong Web Worker để không làm treo giao diện.

## Thêm bài mới

Thêm một object mới vào array `exercises` trong `js/exercises.js`, theo cấu trúc của các bài hiện có.

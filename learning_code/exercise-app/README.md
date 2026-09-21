# JavaScript Practice Lab

Ứng dụng trình duyệt cho toàn bộ khóa JavaScript gồm 16 module, 80 bài học và Practice Lab chấm code cho `Data Types và typeof`.

## Chức năng

- Đọc mục đích và yêu cầu của từng bài.
- Xem kiến thức đó được dùng ở đâu trong dự án thực tế.
- Viết và chạy JavaScript ngay trên trang.
- Xem output hoặc lỗi trong console tích hợp.
- Kiểm tra bài tự động.
- Xem gợi ý và lời giải có giải thích.
- Đăng ký, đăng nhập và đăng xuất bằng tài khoản demo.
- Lưu code và tiến độ riêng cho từng tài khoản bằng `localStorage`.
- Theo dõi phần trăm hoàn thành của 80 bài trong 16 module.
- Khóa bài và module theo thứ tự học bắt buộc.
- Tự đánh dấu bài đã học; riêng Data Types chỉ hoàn thành sau khi vượt qua 4 bài code.
- Đọc lý thuyết, bài tập và lời giải của toàn bộ 80 bài ngay trong Course App.
- Code Lab cho mỗi bài, có console và tự lưu code theo tài khoản.
- Dừng code tự động nếu chạy quá hai giây.

## Cách tính tiến độ

```text
Phần trăm khóa học = số bài đã hoàn thành / 80 × 100
```

Một bài nên được đánh dấu hoàn thành khi bạn đã đọc lý thuyết, tự viết lại ví dụ và làm exercises. Mỗi tài khoản có tiến độ độc lập.

Quy tắc mở khóa:

1. Phải hoàn thành bài hiện tại mới mở được bài tiếp theo.
2. Phải hoàn thành toàn bộ bài trong module mới mở module kế tiếp.
3. Nếu bỏ hoàn thành một bài cũ, toàn bộ tiến độ phía sau sẽ bị khóa lại.

## Lưu ý về tài khoản

Đây là ứng dụng học chạy hoàn toàn trong trình duyệt:

- Tài khoản và tiến độ chỉ được lưu trên trình duyệt hiện tại.
- Mật khẩu được băm trước khi lưu nhưng không có server hoặc database.
- Xóa dữ liệu trình duyệt sẽ xóa tài khoản và tiến độ.
- Không dùng mật khẩu thật hoặc dữ liệu quan trọng trong app demo này.

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
├── course.html
├── css/
│   ├── style.css
│   └── course.css
└── js/
    ├── app.js
    ├── auth.js
    ├── course.js
    ├── course-app.js
    ├── exercises.js
    ├── markdown.js
    ├── progress.js
    └── runner.js
```

- `exercises.js`: nội dung, test, gợi ý và lời giải của bài tập.
- `course.js`: danh sách 16 module và 80 bài để tính tiến độ.
- `course-app.js`: điều hướng, đọc bài, chuyển bài và Code Lab của toàn khóa.
- `markdown.js`: hiển thị README thành nội dung bài học trong app.
- `auth.js`: đăng ký, đăng nhập và phiên đăng nhập local.
- `app.js`: giao diện, tiến độ và điều khiển chạy code.
- `runner.js`: chạy code trong Web Worker để không làm treo giao diện.

## Thêm bài mới

Thêm một object mới vào array `exercises` trong `js/exercises.js`, theo cấu trúc của các bài hiện có.

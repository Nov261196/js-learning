# VUDN

VUDN dùng giao diện Bootstrap, Express API và PostgreSQL. Docker Compose chạy API cùng cơ sở dữ liệu; dữ liệu tài khoản, code và tiến độ được giữ trong volume PostgreSQL.

## Chạy bằng Docker

1. Cài Docker Desktop và mở Docker Engine.
2. Tại thư mục gốc `js-learning`, tạo file `.env` từ mẫu:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Sửa `POSTGRES_PASSWORD` thành mật khẩu DB riêng và `JWT_SECRET` thành chuỗi bí mật ngẫu nhiên ít nhất 32 ký tự.
4. Khởi động ứng dụng:

   ```powershell
   docker compose up --build -d
   ```

5. Mở <http://localhost:3000/learning_code/exercise-app/index.html> và đăng ký tài khoản VUDN.

Xem trạng thái dịch vụ với `docker compose ps`, hoặc xem log bằng `docker compose logs -f app db`. Dừng app bằng `docker compose down`. Dữ liệu DB vẫn còn trong volume `practice_lab_db` và được nạp lại lần sau. Chỉ dùng `docker compose down -v` khi muốn xóa toàn bộ dữ liệu DB.

## Backend API

| Method | Endpoint | Mục đích |
| --- | --- | --- |
| `GET` | `/api/health` | Kiểm tra API và kết nối DB |
| `POST` | `/api/auth/signup` | Tạo tài khoản |
| `POST` | `/api/auth/login` | Đăng nhập và cấp cookie HttpOnly |
| `POST` | `/api/auth/logout` | Đăng xuất |
| `GET` | `/api/auth/me` | Lấy tài khoản trong phiên hiện tại |
| `GET` / `PUT` | `/api/progress` | Đọc/lưu tiến độ và code |

Mật khẩu được băm bằng bcrypt. Phiên đăng nhập dùng JWT trong cookie HttpOnly, còn tiến độ được lưu theo tài khoản trong PostgreSQL. File `server/src/db.js` tự tạo bảng khi server khởi động.

## Cấu trúc

```text
exercise-app/
├── index.html
├── css/
├── js/
│   ├── app.js
│   ├── components/
│   ├── data/
│   └── services/       # API client, auth, tiến độ, markdown, code runner
└── server/
    ├── Dockerfile
    ├── package.json
    └── src/            # Express API và kết nối PostgreSQL
```

Bootstrap CSS và JavaScript tiếp tục được tải từ jsDelivr CDN. Các file bài học và `SOLUTIONS.md` của 16 module được đóng gói trong image app để dùng cùng giao diện.

Tài khoản và tiến độ ở bản localStorage cũ không tự chuyển sang DB; hãy tạo tài khoản mới trong bản Docker.

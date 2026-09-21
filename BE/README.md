# BE / Database

`server/` chứa Express API, JWT cookie authentication và PostgreSQL adapter. PostgreSQL chạy bằng service `db` trong `../docker-compose.yml`; schema được tạo tự động khi API khởi động.

- `GET /api/health`: kiểm tra API và DB
- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`
- `GET /api/progress`, `PUT /api/progress`: đọc và lưu tiến độ tài khoản

# VUDN JavaScript Learning

```text
FE/                  # giao diện và nội dung 16 module
  exercise-app/
BE/                  # Express API và PostgreSQL adapter
  server/
docker-compose.yml   # app + db
```

Tạo `.env` từ `.env.example`, đặt mật khẩu PostgreSQL và JWT secret, rồi chạy `docker compose up --build -d`. Mở `http://localhost:3000/learning_code/exercise-app/index.html`.

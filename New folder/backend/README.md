# Backend

Express MVC API dùng Prisma ORM và MySQL Laragon.

```text
backend/
├── .agents/skills/
├── .claude/skills/
├── .windsurf/skills/
├── controllers/
├── data/
├── lib/
├── middleware/
├── prisma/
├── routes/
├── scripts/
├── test/
├── utils/
├── .env
├── .env.example
├── package.json
├── prisma.config.ts
└── server.js
```

## Cài đặt

```powershell
Copy-Item .env.example .env
npm install
npm run db:setup
npm run dev
```

Backend tự tạo `DATABASE_URL` từ các biến `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` và `DB_PASSWORD` trong `.env`.

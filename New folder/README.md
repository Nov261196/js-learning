# VUDN JavaScript Learning

```text
.
├── backend/   # Express MVC + Prisma + MySQL Laragon
└── frontend/  # HTML/CSS/JavaScript MVC
```

## Chạy dự án

Mở MySQL trong Laragon, sau đó:

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run db:setup
npm run dev
```

Mở <http://localhost:3000>.

import "dotenv/config";
import { defineConfig } from "prisma/config";

const user = encodeURIComponent(process.env.DB_USER ?? "root");
const password = encodeURIComponent(process.env.DB_PASSWORD ?? "");
const host = process.env.DB_HOST ?? "127.0.0.1";
const port = process.env.DB_PORT ?? "3306";
const database = process.env.DB_NAME ?? "vudn";
process.env.DATABASE_URL ??= `mysql://${user}:${password}@${host}:${port}/${database}`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});

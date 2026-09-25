import mysql from "mysql2/promise";
import { getDatabaseUrl } from "../utils/database-url.js";

const databaseUrl = new URL(getDatabaseUrl());
const database = databaseUrl.pathname.slice(1);

if (!/^[a-zA-Z0-9_]+$/.test(database)) {
  throw new Error("Tên database không hợp lệ.");
}

const connection = await mysql.createConnection({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 3306),
  user: decodeURIComponent(databaseUrl.username),
  password: decodeURIComponent(databaseUrl.password),
});

try {
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  console.log(`Database ${database} is ready.`);
} finally {
  await connection.end();
}

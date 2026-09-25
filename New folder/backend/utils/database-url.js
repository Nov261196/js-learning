import "dotenv/config";

export function getDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const user = encodeURIComponent(process.env.DB_USER ?? "root");
  const password = encodeURIComponent(process.env.DB_PASSWORD ?? "");
  const host = process.env.DB_HOST ?? "127.0.0.1";
  const port = process.env.DB_PORT ?? "3306";
  const database = process.env.DB_NAME ?? "vudn";
  return `mysql://${user}:${password}@${host}:${port}/${database}`;
}

process.env.DATABASE_URL ??= getDatabaseUrl();

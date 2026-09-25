import { prisma } from "../lib/prisma.js";

export async function getHealth(_request, response) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    response.json({ status: "ok", database: "ok" });
  } catch {
    response.status(503).json({ status: "error", database: "unavailable" });
  }
}

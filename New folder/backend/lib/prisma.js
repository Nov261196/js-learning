import "../utils/database-url.js";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.__vudnPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__vudnPrisma = prisma;
}

import "dotenv/config";
import { createApp } from "./app.js";
import { prisma } from "./lib/prisma.js";

const port = Number(process.env.PORT ?? 3000);

const app = createApp();
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`VUDN API listening on port ${port}`);
});

async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/database";

const server = app.listen(env.PORT, () => {
  console.log(`[Backend Server] Running on http://localhost:${env.PORT} in ${env.NODE_ENV} mode`);
});

// Graceful shutdown
async function gracefulShutdown(signal: string) {
  console.log(`\nReceived ${signal}. Gracefully shutting down...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log("[Backend Server] Closed database connection and server stopped.");
    process.exit(0);
  });
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

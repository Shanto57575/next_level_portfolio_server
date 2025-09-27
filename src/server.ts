import app from "./app";
import { envVariables } from "./config/envConfig";
import { prisma } from "./config/prisma";
import http, { Server } from "http";

const port = envVariables.PORT;

let server: Server;

async function connectToDb() {
  try {
    await prisma.$connect();
    console.log("*** DB CONNECTION SUCCESSFUL ***");
  } catch (error) {
    console.log("*** DB CONNECTION FAILED *** ", error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectToDb();
    server = http.createServer(app);
    server.listen(port, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Error during server startup:", error);
    process.exit(1);
  }
}

async function gracefulShutdown(signal: string) {
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log("✅ HTTP server closed.");
      handleProcessEvents();
      try {
        console.log("Server shutdown complete.");
      } catch (error) {
        console.error("❌ Error during shutdown:", error);
      }

      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

/**
 * Handle system signals and unexpected errors.
 */
function handleProcessEvents() {
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
}

// Start the application
startServer();

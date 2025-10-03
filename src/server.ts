import app from "./app";
import { envVariables } from "./config/envConfig";
import http, { Server } from "http";
import { prisma } from "./config/prisma";
import bcrypt from "bcrypt";

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

async function seedAdmin() {
  try {
    const email = envVariables.ADMIN_EMAIL as string;
    const password = envVariables.ADMIN_PASSWORD as string;
    const saltRounds = Number(envVariables.BCRYPT_SALT_ROUNDS);

    // find if user already exists
    const isAdminExists = await prisma.user.findUnique({
      where: { email },
    });

    if (isAdminExists) {
      console.log("⚠️ Seed Admin already exists");
      return;
    }

    // password hashing with bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
      data: {
        name: "Shanto",
        email,
        password: hashedPassword,
      },
    });

    console.log("✅ Seed Admin Created successfully : ");
  } catch (error) {
    console.error("❌ Failed to create seedAdmin : ", error);
  }
}

async function startServer() {
  try {
    await connectToDb();

    server = http.createServer(app);
    server.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
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

      try {
        await prisma.$disconnect();
        console.log("✅ DB disconnected.");
        console.log("👋 Server shutdown complete.");
      } catch (error) {
        console.error("❌ Error during shutdown:", error);
      } finally {
        process.exit(0);
      }
    });
  } else {
    process.exit(0);
  }
}

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

(async () => {
  handleProcessEvents();
  await seedAdmin();
  await startServer();
})();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const envConfig_1 = require("./config/envConfig");
const http_1 = __importDefault(require("http"));
const prisma_1 = require("./config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const port = envConfig_1.envVariables.PORT;
let server;
async function connectToDb() {
    try {
        await prisma_1.prisma.$connect();
        console.log("*** DB CONNECTION SUCCESSFUL ***");
    }
    catch (error) {
        console.log("*** DB CONNECTION FAILED *** ", error);
        process.exit(1);
    }
}
async function seedAdmin() {
    try {
        const email = envConfig_1.envVariables.ADMIN_EMAIL;
        const password = envConfig_1.envVariables.ADMIN_PASSWORD;
        const saltRounds = Number(envConfig_1.envVariables.BCRYPT_SALT_ROUNDS);
        // find if user already exists
        const isAdminExists = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (isAdminExists) {
            console.log("⚠️ Seed Admin already exists");
            return;
        }
        // password hashing with bcrypt
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const result = await prisma_1.prisma.user.create({
            data: {
                name: "Shanto",
                email,
                password: hashedPassword,
            },
        });
        console.log("✅ Seed Admin Created successfully : ", result);
    }
    catch (error) {
        console.error("❌ Failed to create seedAdmin : ", error);
    }
}
async function startServer() {
    try {
        await connectToDb();
        server = http_1.default.createServer(app_1.default);
        server.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("❌ Error during server startup:", error);
        process.exit(1);
    }
}
async function gracefulShutdown(signal) {
    console.warn(`🔄 Received ${signal}, shutting down gracefully...`);
    if (server) {
        server.close(async () => {
            console.log("✅ HTTP server closed.");
            try {
                await prisma_1.prisma.$disconnect();
                console.log("✅ DB disconnected.");
                console.log("👋 Server shutdown complete.");
            }
            catch (error) {
                console.error("❌ Error during shutdown:", error);
            }
            finally {
                process.exit(0);
            }
        });
    }
    else {
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

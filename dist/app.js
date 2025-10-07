"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/router/routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const envConfig_1 = require("./config/envConfig");
const app = (0, express_1.default)();
const corsOptions = {
    origin: envConfig_1.envVariables.FRONTEND_URL,
    // origin: "http://localhost:3000",
    credentials: true,
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send({ message: "portfolio server api is running fine" });
});
// routes
app.use("/api/v1", routes_1.router);
// middlewares
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;

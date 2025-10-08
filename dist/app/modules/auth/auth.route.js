"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const catchAsync_1 = require("../../utils/catchAsync");
const router = express_1.default.Router();
router.post("/login", (0, catchAsync_1.catchAsync)(auth_controller_1.AuthController.login));
exports.authRouter = router;

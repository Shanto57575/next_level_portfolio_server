"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createUserTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("../../config/envConfig");
const createUserTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, envConfig_1.envVariables.JWT_ACCESS_SECRET, {
        expiresIn: envConfig_1.envVariables.JWT_ACCESS_EXPIRES,
    });
    return {
        accessToken,
    };
};
exports.createUserTokens = createUserTokens;
const verifyToken = (token, secret) => {
    const verifiedToken = jsonwebtoken_1.default.verify(token, secret);
    return verifiedToken;
};
exports.verifyToken = verifyToken;

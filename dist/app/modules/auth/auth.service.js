"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../../config/prisma");
const userTokens_1 = require("../../utils/userTokens");
const loginService = async (payload) => {
    const { email, password } = payload;
    const isUserExists = await prisma_1.prisma.user.findUnique({
        where: { email: email },
    });
    if (!isUserExists) {
        throw new Error("User Not Found");
    }
    const isPasswordMatched = await bcrypt_1.default.compare(password, isUserExists.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid credentials");
    }
    const jwtPayload = {
        id: isUserExists.id,
        email: isUserExists.email,
    };
    const userTokens = (0, userTokens_1.createUserTokens)(jwtPayload);
    const { password: pass, ...rest } = isUserExists;
    return {
        userTokens,
        user: rest,
    };
};
const getMeService = async (email) => {
    const userInfo = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!userInfo) {
        throw new Error("User Not Found");
    }
    const { password: pass, ...rest } = userInfo;
    return rest;
};
exports.AuthService = {
    loginService,
    getMeService,
};

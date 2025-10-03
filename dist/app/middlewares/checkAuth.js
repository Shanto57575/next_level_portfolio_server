"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const userTokens_1 = require("../utils/userTokens");
const envConfig_1 = require("../../config/envConfig");
const prisma_1 = require("../../config/prisma");
const checkAuth = (email) => async (req, _res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        throw new Error("Token Not Found");
    }
    const verifiedToken = (0, userTokens_1.verifyToken)(accessToken, envConfig_1.envVariables.JWT_ACCESS_SECRET);
    const isUserExists = await prisma_1.prisma.user.findUnique({
        where: { id: verifiedToken.id },
    });
    if (!isUserExists) {
        throw new Error("User Not Found");
    }
    if (verifiedToken.email !== email) {
        throw new Error("unauthorized access");
    }
    req.user = verifiedToken;
    next();
};
exports.checkAuth = checkAuth;

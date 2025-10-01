"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
const setAuthCookie_1 = require("../../utils/setAuthCookie");
const login = async (req, res) => {
    try {
        const loggedInInfo = await auth_service_1.AuthService.loginService(req.body);
        (0, setAuthCookie_1.setAuthCookie)(res, loggedInInfo.userTokens);
        (0, sendResponse_1.sendResponse)({
            res,
            success: true,
            statusCode: 200,
            data: loggedInInfo.user,
            message: "Login Successful",
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            success: false,
            statusCode: 500,
            data: error,
            message: "Login Failed",
        });
    }
};
const logout = async (_req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        (0, sendResponse_1.sendResponse)({
            res,
            success: true,
            statusCode: 200,
            data: null,
            message: "logged out Successfully",
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            success: false,
            statusCode: 500,
            data: error,
            message: "Failed to log out",
        });
    }
};
exports.AuthController = {
    login,
    logout,
};

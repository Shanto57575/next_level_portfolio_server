"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
const setAuthCookie_1 = require("../../utils/setAuthCookie");
const login = async (req, res) => {
    const loggedInInfo = await auth_service_1.AuthService.loginService(req.body);
    (0, setAuthCookie_1.setAuthCookie)(res, loggedInInfo.userTokens);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: loggedInInfo.user,
        message: "Login Successful",
    });
};
const logout = async (_req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: null,
        message: "Logged out Successfully",
    });
};
const getMe = async (req, res) => {
    const decodedToken = req.user;
    const result = await auth_service_1.AuthService.getMeService(decodedToken.email);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: result,
        message: "userInfo retrieved Successfully",
    });
};
exports.AuthController = {
    login,
    logout,
    getMe,
};

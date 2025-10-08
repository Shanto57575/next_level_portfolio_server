"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
const login = async (req, res) => {
    const loggedInInfo = await auth_service_1.AuthService.loginService(req.body);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: {
            user: loggedInInfo.user,
            token: loggedInInfo.userToken,
        },
        message: "Login Successful",
    });
};
exports.AuthController = {
    login,
};

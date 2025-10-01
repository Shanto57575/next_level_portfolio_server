"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = ({ res, success, statusCode, data, message, }) => {
    return res.status(statusCode).json({
        success,
        data,
        message,
    });
};
exports.sendResponse = sendResponse;

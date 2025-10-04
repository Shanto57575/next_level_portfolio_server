"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
};
exports.default = notFound;

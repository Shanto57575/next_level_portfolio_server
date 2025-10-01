"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
exports.router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        element: auth_route_1.authRouter,
    },
    {
        path: "/blog",
        element: blog_route_1.blogRouter,
    },
];
moduleRoutes.forEach((route) => exports.router.use(route.path, route.element));

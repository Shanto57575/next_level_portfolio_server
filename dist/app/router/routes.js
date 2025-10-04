"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const project_route_1 = require("../modules/project/project.route");
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
    {
        path: "/project",
        element: project_route_1.projectRouter,
    },
];
moduleRoutes.forEach((route) => exports.router.use(route.path, route.element));

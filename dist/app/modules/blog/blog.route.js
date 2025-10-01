"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const envConfig_1 = require("../../../config/envConfig");
const multer_1 = require("../../middlewares/multer");
const router = express_1.default.Router();
router.post("/create-blog", (0, checkAuth_1.checkAuth)(envConfig_1.envVariables.ADMIN_EMAIL), multer_1.upload.single("file"), blog_controller_1.BlogController.createBlog);
router.get("/all-blogs", blog_controller_1.BlogController.createBlog);
router.put("/:id", (0, checkAuth_1.checkAuth)(envConfig_1.envVariables.ADMIN_EMAIL), blog_controller_1.BlogController.createBlog);
router.delete("/:id", (0, checkAuth_1.checkAuth)(envConfig_1.envVariables.ADMIN_EMAIL), blog_controller_1.BlogController.createBlog);
exports.blogRouter = router;

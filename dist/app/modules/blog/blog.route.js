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
const catchAsync_1 = require("../../utils/catchAsync");
const router = express_1.default.Router();
router.post("/create-blog", (0, checkAuth_1.checkAuth)(envConfig_1.envVariables.ADMIN_EMAIL), multer_1.upload.single("file"), (0, catchAsync_1.catchAsync)(blog_controller_1.BlogController.createBlog));
router.get("/all-blogs", (0, catchAsync_1.catchAsync)(blog_controller_1.BlogController.allBlogs));
router.get("/:id", (0, catchAsync_1.catchAsync)(blog_controller_1.BlogController.getBlogById));
router.put("/:id", (0, checkAuth_1.checkAuth)(envConfig_1.envVariables.ADMIN_EMAIL), multer_1.upload.single("file"), (0, catchAsync_1.catchAsync)(blog_controller_1.BlogController.updateBlog));
router.delete("/:id", (0, checkAuth_1.checkAuth)(envConfig_1.envVariables.ADMIN_EMAIL), (0, catchAsync_1.catchAsync)(blog_controller_1.BlogController.deleteBlog));
exports.blogRouter = router;

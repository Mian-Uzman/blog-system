const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");

router.post("/create_blog", blogController.addBlog);

router.get("/get_user_blogs", blogController.getUserBlogs);

router.get("/get_all_blogs", blogController.getAllBlogs);

router.get("/get_single_blog/:blogId?", blogController.getSingleBlog);

router.put("/update_blog/:blogId?", blogController.updateBlog);

router.delete("/delete_blog/:blogId?", blogController.deleteBlog);

router.post("/add_comment/:blogId?", blogController.addComment);

router.delete("/delete_comment/:blogId?/:commentId?", blogController.deleteComment);

module.exports = router;

const express = require("express");
const router = express.Router();

const Blog = require("../models/blogSchema");

router.post("/create_blog", async (req, res, next) => {
	const { title, content } = req.body;
	const id = req.user.id;
	try {
		const blog = await Blog.create({ title, content, authorDetail: id });
		// console.log(blog);
		res.json({ Message: "Blog Added" });
	} catch (error) {
		next({ status: 500, message: error.message });
	}
});

router.get("/get_all_blogs", async (req, res, next) => {
	try {
		const id = req.user.id;
		const blogPosts = await Blog.find({ authorDetail: id }).populate(
			"authorDetail",
			"-email -password"
		);
		res.json({ blogPosts });
	} catch (error) {
		next({ status: 500, message: error.message });
	}
});

router.get("/get_single_blog/:blogId?", async (req, res, next) => {
	const blogId = req.params.blogId;
	try {
		const id = req.user.id;
		const blogPosts = await Blog.find({ authorDetail: id, _id: blogId }).populate(
			"authorDetail",
			"-email -password"
		);
		res.json({ blogPosts });
	} catch (error) {
		next({ status: 500, message: error.message });
	}
});

module.exports = router;

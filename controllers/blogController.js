const Blog = require("../models/blogSchema");

module.exports = {
	addBlog: async (req, res, next) => {
		const { title, content, tags } = req.body;
		const id = req.user.id;
		try {
			const blog = await Blog.create({ title, content, authorDetail: id, tags });
			res.json({ Message: "Blog Added" });
		} catch (error) {
			next({ status: 500, message: error.message });
		}
	},
	getUserBlogs: async (req, res, next) => {
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
	},
	getAllBlogs: async (req, res, next) => {
		try {
			const id = req.user.id;
			const blogPosts = await Blog.find({}).populate("authorDetail", "-email -password");
			res.json({ blogPosts });
		} catch (error) {
			next({ status: 500, message: error.message });
		}
	},

	getSingleBlog: async (req, res, next) => {
		const blogId = req.params.blogId;
		try {
			const blogPosts = await Blog.find({
				_id: blogId,
			}).populate("authorDetail", "-email -password");
			res.json({ blogPosts });
		} catch (error) {
			next({ status: 500, message: error.message });
		}
	},
	updateBlog: async (req, res, next) => {
		const blogId = req.params.blogId;
		const { title, content, tags } = req.body;
		const id = req.user.id;
		try {
			const blog = await Blog.updateOne(
				{ _id: blogId },
				{ title, content, authorDetail: id, $push: { tags: tags } }
			);
			res.json({ message: `Blog with ID ${blogId} Updated` });
		} catch (error) {
			next({ status: 500, message: error.message });
		}
	},

	deleteBlog: async (req, res, next) => {
		const blogId = req.params.blogId;
		try {
			const id = req.user.id;
			const deleteBlogPosts = await Blog.deleteOne({
				authorDetail: id,
				_id: blogId,
			});
			res.json({ message: `Blog with ID ${blogId} Deleted` });
		} catch (error) {
			next({ status: 500, message: error.message });
		}
	},

	addComment: async (req, res, next) => {
		const { comment } = req.body;
		const userId = req.user.id;
		const userName = req.user.name;
		const blogId = req.params.blogId;

		try {
			console.log(req.user);
			const commentBlog = await Blog.updateOne(
				{ _id: blogId },
				{
					$push: { comments: { comment, userDetail: userId,userName } },
				}
			);
			res.json({ Message: "Comment Added on blog " + blogId });
		} catch (error) {
			next({ status: 500, message: error.message });
		}
	},

	deleteComment: async (req, res, next) => {
		const blogId = req.params.blogId;
		const commentId = req.params.commentId;
		try {
			const id = req.user.id;
			const deleteSingleComment = await Blog.updateOne(
				{
					authorDetail: id,
					_id: blogId,
				},
				{
					$pull: {
						comments: { _id: commentId },
					},
				}
			);
			res.json({ message: `Comment with ID ${commentId} Deleted from blog ${blogId}` });
		} catch (error) {
			next({ status: 500, message: error.message });
		}
	},
};

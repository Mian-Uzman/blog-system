const mongoose = require("mongoose");

const Comments = mongoose.Schema({
	comment: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	userDetail: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	postedAt: {
		type: Date,
		default: Date.now,
	},
});

const blogSchema = mongoose.Schema({
	title: {
		type: String,
		min: 5,
		max: 100,
		required: true,
	},
	content: {
		type: String,
		min: 5,
		max: 1000,
		required: true,
	},
	tags: [String],

	authorDetail: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	comments: [Comments],

	postedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("blog", blogSchema);

const mongoose = require("mongoose");

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
	authorDetail: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	postedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("blog", blogSchema);

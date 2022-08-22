const express = require("express");
const mongoose = require("mongoose");
const app = express();
const blogRoutes = require("./routes/blogRoutes");
const authRoute = require("./routes/authRoute");
const jwt = require("jsonwebtoken");

const PORT = 3000;

app.use(express.json());

// Middlewares
const authMiddleware = (req, res, next) => {
	// Check JWT token
	const SECRET_KEY = "superstring";
	const token = req.header("Authorization") || "";
	if (!token) {
		return res.status(401).json({ message: "Unauthorized access" });
	}
	const decode = jwt.decode(token, SECRET_KEY);
	if (!decode) {
		return res.status(401).json({ message: "Unauthorized access" });
	}
	req.user = decode;
	next();
};

const errorMiddleware = (err, req, res, next) => {
	res.status(err.status).json({ error: true, message: err.message });
};

// Routes
app.use("/blog", authMiddleware, blogRoutes);
app.use("/auth", authRoute);
app.use(errorMiddleware);

// MongoDB connection and Express Server Start
mongoose
	.connect("mongodb://localhost/training_mongodb")
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Listening on Port ${PORT}`);
		});
		console.log("MongoDB Connected");
	})
	.catch((err) => console.log(err));

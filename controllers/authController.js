const User = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
	registerUser: async (req, res, next) => {
		const { name, email, password } = req.body;
		// Encrypt the password
		const encryptedPassword = bcryptjs.hashSync(password, 15);
		try {
			const newUser = await User.create({
				name,
				email,
				password: encryptedPassword,
			});
			res.json({ user: newUser });
		} catch (error) {
			next({ status: 500, message: error.message });
		}
	},

	loginUser: async (req, res, next) => {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return next({
					status: 404,
					message: "Username or password is incorrect",
				});
			}
			const dbPassword = user.password;
			const validatePassword = await bcryptjs.compareSync(password, dbPassword);
			if (validatePassword) {
				// Send JWT Token
				const jwtPayload = { name: user.name, id: user._id, email: user.email };
				// Dev Secret Key
				const SECRET_KEY = "superstring";
				const token = jwt.sign(jwtPayload, SECRET_KEY, { expiresIn: "1d" });
				res.json({ message: "Login Success", name: user.name, userId: user._id, token });
			} else {
				return next({
					status: 404,
					message: "Username or password is incorrect",
				});
			}
		} catch (error) {
			next({ status: 500, message: error.message });
		}
	},
};

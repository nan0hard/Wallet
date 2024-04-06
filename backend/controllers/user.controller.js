import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import {
	signupValidator,
	signinValidator,
	updateProfileValidator,
} from "../validations/user.validation.js";
import Account from "../models/account.model.js";

const signUp = async (req, res) => {
	const { success } = signupValidator.safeParse(req.body);
	const { firstName, lastName, email, password } = req.body;

	if (success) {
		try {
			const userExists = await User.findOne({ email });

			if (userExists) {
				return res.status(411).json({
					success: false,
					msg: "Email already in use!",
				});
			}

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			console.log(hash);

			const newUser = await User.create({
				firstName,
				lastName,
				email,
				password: hash,
			});

			const userId = newUser._id;

			await Account.create({
				userId,
				balance: Math.random() * 1000 + 1,
			});

			const token = jwt.sign(
				{
					userId,
				},
				process.env.JWT_SECRET
			);

			res.json({
				msg: "Sign Up Successful!!",
				token,
			});
		} catch (error) {
			console.log(error);
			res.send({
				success: false,
				msg: error,
			});
		}
	} else {
		res.send({
			success: false,
			msg: "Your inputs are wrong",
		});
	}
};

const signIn = async (req, res) => {
	const { email, password } = req.body;

	const validate = signinValidator.safeParse(req.body);
	if (validate.success) {
		try {
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(411).json({
					success: false,
					msg: "Email not found!!",
				});
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (passwordMatch) {
				res.send({ success: true, msg: "Logged in Successfully" });
			} else {
				res.send({ success: false, msg: "Wrong Password!!" });
			}
		} catch (error) {
			console.log(error);
		}
	}
};

const updateProfile = async (req, res) => {
	// const { firstName, lastName, newPassword } = req.body;

	const { success } = updateProfileValidator.safeParse(req.body);

	if (!success) {
		return res.status(411).json({
			success: false,
			msg: "Wrong Inputs",
		});
	}

	await User.updateOne({ id: req.userId });

	res.json({
		success: true,
		msg: "Updated successfully",
	});
};

const users = async (req, res) => {
	const filter = req.query.filter || "";

	const filteredUsers = await User.find({
		$or: [
			{
				firstName: {
					$regex: filter,
					$options: "i",
				},
			},
			{
				lastName: {
					$regex: filter,
					$options: "i",
				},
			},
		],
	});

	// const allUsers = await User.find({});

	res.json({
		user: filteredUsers.map((user) => ({
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			_id: user._id,
		})),
	});
};

export { signIn, signUp, updateProfile, users };

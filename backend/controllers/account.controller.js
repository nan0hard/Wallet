import mongoose from "mongoose";

import Account from "../models/account.model.js";

export const balance = async (req, res) => {
	const accountBal = await Account.findOne({ userId: req.userId });

	if (!accountBal) {
		return res.status(401).json({
			success: false,
			msg: "User not found!!",
		});
	}

	res.json({
		success: true,
		balance: accountBal.balance,
	});
};

export const transferMoney = async (req, res) => {
	console.log(req.userId);
	const session = await mongoose.startSession();
	session.startTransaction();

	const { to, amount } = req.body;

	const fromAccount = await Account.findOne({
		userId: req.userId,
	}).session(session);

	if (fromAccount.balance < amount) {
		await session.abortTransaction();
		return res.status(400).json({
			success: false,
			msg: "Insufficient Balance",
		});
	}

	const toAccount = await Account.findOne({
		userId: to,
	}).session(session);

	if (!toAccount) {
		await session.abortTransaction();
		return res.status(400).json({
			success: false,
			msg: "Invalid Account!",
		});
	}

	// Perform the transfer
	await Account.updateOne(
		{ userId: fromAccount.userId },
		{
			$inc: {
				balance: -amount,
			},
		}
	).session(session);

	await Account.updateOne(
		{ userId: toAccount.userId },
		{
			$inc: {
				balance: amount,
			},
		}
	).session(session);

	// Committing the transaction

	await session.commitTransaction();
	res.json({
		success: true,
		msg: "Transfer Successful",
	});
};

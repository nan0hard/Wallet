import express from "express";
const router = express.Router();

import {
	signUp,
	signIn,
	updateProfile,
	users,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/middleware.js";

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/updateProfile").put(authMiddleware, updateProfile);
router.route("/bulk").get(users);

export default router;

import express from "express";
import { balance, transferMoney } from "../controllers/account.controller.js";
import { authMiddleware } from "../middlewares/middleware.js";

const router = express.Router();

router.route("/balance").get(authMiddleware, balance);
router.route("/transferMoney").post(authMiddleware, transferMoney);

export default router;

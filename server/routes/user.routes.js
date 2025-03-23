import express from "express";
import { register, login, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.use(verifyToken);
router.patch("/update-user", updateUser);

export default router;

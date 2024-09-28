import { signup, login, logout, refreshToken, getProfile, } from "../controllers/authController.js";

import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh-token", refreshToken);
authRouter.get("/profile",protectRoute,getProfile)


export default authRouter;

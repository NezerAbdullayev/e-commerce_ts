import { signup, login, logout, refreshToken, } from "../controllers/authController.js";

import express from "express";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh-token", refreshToken);
// authRouter.get("/profile",getProfile)


export default authRouter;

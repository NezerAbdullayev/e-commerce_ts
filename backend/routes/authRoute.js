import { signup, login, logout } from '../controllers/authController.js';

import express from "express"

const authRouter=express.Router();

authRouter.post("/signup",signup)

authRouter.get("/login",login)

authRouter.post("/logout",logout)



export default authRouter

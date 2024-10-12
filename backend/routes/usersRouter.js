import express from "express";
import { protectRoute,adminRoute } from "../middleware/authMiddleware.js"; 

import { getAllUsers,deleteUser } from "../controllers/usersController.js";

usersRouter=express.Router()

usersRouter.get("/",protectRoute,adminRoute,getAllUsers)
usersRouter.delete("/:id",protectRoute,adminRoute,deleteUser)


export default usersRouter
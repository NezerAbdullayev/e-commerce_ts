import express from "express";
import { protectRoute,adminRoute } from "../middleware/authMiddleware.js"; 
import { deleteUser, getAllUsers } from "../controllers/usersController.js";


const usersRouter=express.Router()

usersRouter.get("/",protectRoute,adminRoute,getAllUsers)
usersRouter.delete("/:id",protectRoute,adminRoute,deleteUser)


export default usersRouter
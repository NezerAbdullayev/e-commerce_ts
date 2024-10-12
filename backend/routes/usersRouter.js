import express from "express";
import { protectRoute,adminRoute } from "../middleware/authMiddleware.js"; 
import { deleteUser, getAllUsers,getSearchUsers } from "../controllers/usersController.js";


const usersRouter=express.Router()

usersRouter.get("/",protectRoute,adminRoute,getAllUsers)
usersRouter.get("/search", protectRoute, adminRoute, getSearchUsers);
usersRouter.delete("/:id",protectRoute,adminRoute,deleteUser)


export default usersRouter
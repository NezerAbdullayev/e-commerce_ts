import express from "express";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";



import { createCategory,deleteCategory,getAllCategory,updateCategory } from "../controllers/categoryController.js";



const  categoryRouter=express.Router()

categoryRouter.get("/",getAllCategory)
categoryRouter.post("/", protectRoute, adminRoute ,createCategory)
categoryRouter.delete("/:id",protectRoute, adminRoute ,deleteCategory)
categoryRouter.put("/:id",protectRoute, adminRoute,updateCategory)


export default categoryRouter;

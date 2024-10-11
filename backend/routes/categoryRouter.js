import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";


const categoryRouter=express.Router()

// categoryRouter.get("/",getcategory)
// categoryRouter.delete("/",deleteCategory)
// categoryRouter.post("/",addNewCategory)
// categoryRouter.put("/",updateCatgeory)


export default categoryRouter;

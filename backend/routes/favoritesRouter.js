import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";

import { addToFavorites, getFavorites, removeAllFavorites } from "../controllers/favoritesController.js";

const favoritesRouter=express.Router()

favoritesRouter.get("/",protectRoute,getFavorites)
favoritesRouter.post("/",protectRoute,addToFavorites)
favoritesRouter.delete("/",protectRoute,removeAllFavorites)
// favoritesRouter.delete("/:id",protectRoute,removeAllFavorites)



export default favoritesRouter;
 
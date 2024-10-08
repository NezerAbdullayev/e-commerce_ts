import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";

import { addToFavorites, getFavorites, removeAllFavorites,removeFavoritesItem } from "../controllers/favoritesController.js";

const favoritesRouter=express.Router()

favoritesRouter.get("/",protectRoute,getFavorites)
favoritesRouter.post("/",protectRoute,addToFavorites)
favoritesRouter.delete("/",protectRoute,removeAllFavorites)
favoritesRouter.delete("/:id",protectRoute,removeFavoritesItem)



export default favoritesRouter;
 
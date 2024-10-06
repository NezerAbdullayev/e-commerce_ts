import express from "express";
import {  protectRoute } from "../middleware/authMiddleware.js";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/", protectRoute, getCartProducts);
cartRouter.post("/addcart", protectRoute, addToCart);
cartRouter.delete("/", protectRoute, removeAllFromCart);
cartRouter.put("/:id", protectRoute, updateQuantity);

export default cartRouter;
 
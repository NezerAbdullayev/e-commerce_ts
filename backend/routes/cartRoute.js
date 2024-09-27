import express from "express";
import { adminRoute, protectRoute } from "../middleware/authMiddleware";

const cartRouter = express.Router();

cartRouter.get("/", protectRoute, adminRoute, getCartProducts);
cartRouter.post("/", protectRoute, adminRoute, addToCart);
cartRouter.delete("/", protectRoute, removeAllFromCart);
cartRouter.put("/:id", protectRoute, updateQuantity);

export default cartRouter;

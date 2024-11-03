import express from "express";
import { protectRoute, adminRoute } from "../middleware/authMiddleware.js";

import { getAllOrders, createOrder, deleteOrder, updateOrder } from "../controllers/ordersController.js";

const orderRouter = express.Router();

orderRouter.get("/", protectRoute, getAllOrders);
orderRouter.post("/", protectRoute, createOrder);
orderRouter.delete("/:id", protectRoute, adminRoute, deleteOrder);
orderRouter.patch("/:id", protectRoute, adminRoute, updateOrder);

export default orderRouter;

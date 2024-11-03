import express from "express";
import { protectRoute, adminRoute } from "../middleware/authMiddleware.js";

import { getAllOrders, createOrder, deleteOrder, updateOrder,getMyOrders } from "../controllers/ordersController.js";

const orderRouter = express.Router();

orderRouter.get("/my-orders",protectRoute,getMyOrders);
orderRouter.get("/", protectRoute,adminRoute, getAllOrders);
orderRouter.post("/", protectRoute, createOrder);
orderRouter.delete("/:id", protectRoute, adminRoute, deleteOrder);
orderRouter.put("/:id", protectRoute, adminRoute, updateOrder);

export default orderRouter;

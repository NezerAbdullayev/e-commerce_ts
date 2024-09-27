import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", protectRoute, createCheckoutSession);
paymentRouter.post("/checkout-success", protectRoute, checkoutSuccess);

export default paymentRouter;

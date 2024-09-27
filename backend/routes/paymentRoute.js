import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { createCheckoutSession } from "../controllers/paymentController.js";
import { stripe } from "../config/stripe.js";
import Coupon from "../models/couponModel.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", protectRoute, createCheckoutSession);
paymentRouter.post("/checkout-success", protectRoute, async (req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            if (session.metadata.couponCode) {
                await Coupon.findOneAndUpdate(
                    {
                        code: session.metadata.couponCode,
                        userId: session.metadata.userId,
                    },
                    {
                        isActive: false,
                    }
                );
            }
        }
    } catch (error) {}
});

export default paymentRouter;

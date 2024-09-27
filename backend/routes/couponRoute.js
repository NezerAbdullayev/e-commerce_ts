import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getCoupon, validateCoupon } from "../controllers/couponControoler.js";

const couponRouter = express.Router();

couponRouter.get("/", protectRoute, getCoupon);
couponRouter.get("/validate", protectRoute, getCoupon, validateCoupon);

export default couponRouter;

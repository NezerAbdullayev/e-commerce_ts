import express from "express";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { getAnalyticsData, getDailySalesData } from "../controllers/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/", protectRoute, adminRoute, async (_, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); //7 days

        const dailySalesData = await getDailySalesData(startDate, endDate);

        res.json({
            analyticsData,
            dailySalesData,
        });
    } catch (error) {
        console.log("Error in analytics route", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default analyticsRouter;

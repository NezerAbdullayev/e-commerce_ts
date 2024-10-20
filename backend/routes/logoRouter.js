import express from "express";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";

import { getAppLogo, updateLogo } from "../controllers/logoController.js";

const logoRouter = express.Router();

logoRouter.get("/", getAppLogo);
logoRouter.put("/", protectRoute, adminRoute, updateLogo);

export default logoRouter;

import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductByCategory,
    getRecommendedProducts,
    toggleFeaturedProduct,
} from "../controllers/productController.js";
import express from "express";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

// image strorage engine

productRouter.get("/", getAllProducts);

productRouter.get("/featured", getFeaturedProducts);

productRouter.get("/category/:category", getProductByCategory);

productRouter.get("/recommendations", getRecommendedProducts);

productRouter.post("/new", protectRoute, adminRoute, createProduct);

productRouter.put("/:id", protectRoute, adminRoute, toggleFeaturedProduct);

productRouter.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default productRouter;

import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getFeaturedProducts,
    getRandomProducts,
    getProductByCategory,
    getRecommendedProducts,
    toggleFeaturedProduct,
    getProductById,
    addProductReview,
    getTopProducts,
} from "../controllers/productController.js";
import express from "express";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

// image strorage engine

productRouter.get("/", getAllProducts);

productRouter.get("/featured", getFeaturedProducts);

productRouter.get("/random/:count", getRandomProducts);

productRouter.get("/:id", getProductById);

productRouter.get("/category/:categories", getProductByCategory);

productRouter.get("/recommendations", getRecommendedProducts);

productRouter.get("/top", getTopProducts);

productRouter.post("/new", protectRoute, adminRoute, createProduct);

productRouter.post("/:id/reviews", protectRoute, addProductReview);

productRouter.put("/:id", protectRoute, adminRoute, toggleFeaturedProduct);

productRouter.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default productRouter;

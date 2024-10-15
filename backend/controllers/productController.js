import cloudinary from "../config/cloudinary.js";
import { redis } from "../config/redis.js";
import ProductModel from "../models/productModel.js";
import Category from "../models/categoryModel.js";

const getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        // get all products
        const products = await ProductModel.find({})
            .populate("category", "name")
            .sort({ $natural: -1 })
            .limit(limit)
            .skip((page - 1) * limit);

        const totalProducts = await ProductModel.countDocuments();

        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
        });
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getFeaturedProducts = async (_, res) => {
    try {
        let featuredProducts = await redis.get("featured_products");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        // if not in redis,fetch from mongoDB
        // .Lean() is gonna return  a plain js obj  instead od a mongodb doc
        // which is good for ferformance

        featuredProducts = await ProductModel.find({ isFeatured: true }).lean();

        if (!featuredProducts) return res.status(404).json({ message: "No featured products found" });

        await redis.set("featured_products", JSON.stringify(featuredProducts));
        res.json(featuredProducts);
    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, stock, brand } = req.body.newProduct;

        let cloudinaryResponses = [];

        if (Array.isArray(image) && image.length > 0) {
            for (const img of image) {
                try {
                    const cloudinaryResponse = await cloudinary.uploader.upload(img, { folder: "products" });
                    cloudinaryResponses.push(cloudinaryResponse.secure_url);
                } catch (err) {
                    console.error("Error uploading image:", err.message);
                    return res.status(500).json({ message: "Image upload failed", error: err.message || "Unknown error" });
                }
            }
        }

        const product = await ProductModel.create({
            name,
            description,
            price,
            image: cloudinaryResponses,
            category: category,
            stock,
            brand: brand ? brand : "",
            reviews: [],
        });

        res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct controller", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.image && product.image.length > 0) {
            console.log(product.image);
            for (const imageUrl of product.image) {
                const publicId = imageUrl.split("/").pop().split(".")[0];
                try {
                    await cloudinary.uploader.destroy(`products/${publicId}`);
                    console.log(`Deleted image ${publicId} from Cloudinary`);
                } catch (error) {
                    console.log("Error deleting image in Cloudinary", error);
                }
            }
        }

        await ProductModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const addProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { id } = req.params;

        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const alreadyReview = product.reviews.find((r) => r.user.toString() === req.user._id.toString());

        if (alreadyReview) {
            return res.status(400).json({ message: "Product already reviewed" });
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        return res.status(201).json({ message: "Review added" });
    } catch (error) {
        console.log("Error in addProductReview controller", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getRecommendedProducts = async (_, res) => {
    try {
        const products = await ProductModel.aggregate([
            {
                $sample: { size: 3 },
            },
            {
                _id: 1,
                name: 1,
                description: 1,
                image: 1,
                price: 1,
            },
        ]);

        res.json(products);
    } catch (error) {
        console.log("Error in getrecommendedProducts controller", error.message);
        res.json(500).json({ message: "Server error", error: error.message });
    }
};

const getRandomProducts = async (req, res) => {
    const count = parseInt(req.params.count) || 5;

    try {
        const randomProducts = await ProductModel.aggregate([{ $sample: { size: count } }]);

        if (randomProducts.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.json(randomProducts);
    } catch (error) {
        console.error("Error in getting random products", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findById(productId).populate("category", "name");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProductByCategory = async (req, res) => {
    const { categories, brand, minPrice, maxPrice, search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const filter = {};

        // Categories
        if (categories) {
            const categoryArray = categories.split(",");
            const categoryIds = await Category.find({ name: { $in: categoryArray } }, "_id");
            filter.category = { $in: categoryIds };
        }

        // Brand
        if (brand) {
            filter.brand = brand;
        }

        // Price Range (
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseInt(minPrice);
            if (maxPrice) filter.price.$lte = parseInt(maxPrice);
        }

        // Search
        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        // find products
        const products = await ProductModel.find(filter)
            .limit(limit)
            .skip((page - 1) * limit);

        // total products
        const totalProducts = await ProductModel.countDocuments(filter);

        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
        });
    } catch (error) {
        console.log("Error in getProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getTopProducts = async (req, res) => {
    try {
        products = await ProductModel.find({}).sort({ rating: -1 }).limit(8);
        res.json(products);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductsCach();

            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

async function updateFeaturedProductsCach() {
    try {
        // the lean() method is used to return plain js obj instead of full mongose docs. this can significantly improve perfomance
        const featuredProducts = await ProductModel.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("error in update cache function");
    }
}

export {
    getAllProducts,
    getFeaturedProducts,
    createProduct,
    deleteProduct,
    getRecommendedProducts,
    getProductByCategory,
    getRandomProducts,
    toggleFeaturedProduct,
    getProductById,
    getTopProducts,
};

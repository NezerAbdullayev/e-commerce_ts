import cloudinary from "../config/cloudinary.js";
import { redis } from "../config/redis.js";
import ProductModel from "../models/productModel.js";

const getAllProducts = async (req, res) => {
    try {
        // get all products
        const products = await ProductModel.find({});
        res.json({ products });
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getFeaturedProducts = async (req, res) => {
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
        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null;
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        const product = await ProductModel.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category,
        });

        res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct contoller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
        // res.
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.image) {
            // this willl get the id of the image from cloudinary
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("deleted image from clodinary");
            } catch (error) {
                console.log("error deleting image in clodinary", error);
            }
        }

        await ProductModel.findByIdAndDelete(req.params.id);

        res.json({ message: "Prodcut deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getRecommendedProducts = async (req, res) => {
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

const getProductByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await ProductModel.find({ category });
        res.json(products);
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
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
    toggleFeaturedProduct,
};

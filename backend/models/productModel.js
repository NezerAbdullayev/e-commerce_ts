import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, min: 0, required: true },
        image: { type: [String], required: [true, "At least one image is required"] },
        category: { type: String, required: true },
        brand: { type: String },
        rating: { type: Number, default: 0 },
        stock: { type: Number, min: 1, required: true },
        reviews: {
            type: [
                {
                    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                    rating: { type: Number, min: 1, max: 5 },
                    comment: { type: String },
                    date: { type: Date, default: Date.now },
                },
            ],
            default: [],
        },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const ProductModel = mongoose.models.product || mongoose.model("Product", productSchema);

export default ProductModel;

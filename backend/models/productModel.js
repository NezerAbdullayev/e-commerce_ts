import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, min: 0, required: true },
        image: { type: [String], required: [true, "At least one image is required"] },
        category: [{ type: ObjectId, ref: "Category" }],
        brand: { type: String },
        rating: { type: Number, default: 0 },
        stock: { type: Number, min: 1, required: true },
        reviews: [reviewSchema],
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const ProductModel = mongoose.models.product || mongoose.model("Product", productSchema);

export default ProductModel;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["Pending", "Completed", "Shipped"],
            default: "Pending",
        }
    },
    {
        timestamps: true,
    }
);


orderSchema.pre("save", function (next) {
    this.totalAmount = this.quantity * this.price; 
    next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

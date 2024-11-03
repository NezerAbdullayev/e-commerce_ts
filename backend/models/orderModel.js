import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
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
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["Pending", "Completed", "Shipped"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

orderSchema.pre("save", function (next) {
    this.totalAmount = this.products.reduce((total, item) => {
        return total + item.quantity * item.price;
    }, 0);
    next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

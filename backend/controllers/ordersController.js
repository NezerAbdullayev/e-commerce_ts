import Order from "../models/orderModel.js";

export const getAllOrders = async (_, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("products.product", "name price");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve orders", error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { user, products } = req.body;

        // Calculate total amount based on products array
        const totalAmount = products.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);

        const newOrder = new Order({
            user,
            products,
            totalAmount,
            status: "Pending",
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: "Failed to create order", error: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete order", error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status if provided
        if (status && !["Pending", "Completed", "Shipped"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Failed to update order", error: error.message });
    }
};
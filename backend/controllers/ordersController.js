import Order from "../models/orderModel.js";

export const getAllOrders = async (_, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("product.product", "name price");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve orders", error: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user._id; 

        const orders = await Order.find({ user: userId }).populate('product.product',"name price");

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json(orders.reverse());
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve orders", error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { quantity, price, productId } = req.body;

        const user = req.user; 

        const newOrder = new Order({
            user: user._id,
            product: {
                product: productId, 
                quantity,
                price,
            },
            totalAmount: quantity * price, 
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

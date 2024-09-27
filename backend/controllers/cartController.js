const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const exsistingItem = user.cartItems.find((item) => item.id === productId);

        if (exsistingItem) exsistingItem.quantity += 1;
        else user.cartItems.push(productId);

        await user.save();
        req.json(user.cartItems);
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) user.cartItems = [];
        else user.cartItems = user.cartItems.filter((item) => item.id !== productId);

        await user.save();
        req.json(user.cartItems);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { addToCart ,removeAllFromCart};

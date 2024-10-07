import ProductModel from "../models/productModel.js";

const getCartProducts = async (req, res) => {
    try {
        const cartItems = req.user.cartItem || []; 
        res.json(cartItems); 
    } catch (error) {
        console.log("Error in getCartProducts controller", error.message); 
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, name, image, price } = req.body;

        const user = req.user;

     
        if (!user.cartItem) {
            user.cartItem = [];
        }

        const existingItem = user.cartItem.find((item) => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
           
            user.cartItem.push({
                productId,
                name,
                image,
                price,
                quantity: 1
            });
        }

        await user.save();
        res.json(user.cartItem);
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user


        if (!user) 
            return res.status(404).json({ message: "User not found" });


        if (!productId) user.cartItem = [];
        else 
            user.cartItem = user.cartItem.filter((item) => item.productId !== productId);

        await user.save();
        res.json(user.cartItem);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const updateQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        
        const exsistingItem = user.cartItem.find((item) => item.productId === id);


        if (exsistingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItem.find((item) => item.productId !== id);
                await user.save();
                return res.json(user.cartItem);
            }
            exsistingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItem);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export { addToCart, removeAllFromCart, updateQuantity, getCartProducts, };

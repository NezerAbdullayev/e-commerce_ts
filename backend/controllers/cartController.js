import ProductModel from "../models/productModel.js";

const getCartProducts = async (req, res) => {
    try {
       
        const productIds = req.user.cartItem.map(item => item.productId); 
        const products = await ProductModel.find({ _id: { $in: productIds } }); 


        const cartItems = products.map((product) => {
            const item = req.user.cartItem.find((cart) => cart.productId === product._id.toString()); 
            return { ...product.toJSON(), quantity: item ? item.quantity : 0 }; 
        });

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

        console.log(productId, name, image, price);

     
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
        if (!productId) user.cartItems = [];
        else user.cartItems = user.cartItems.filter((item) => item.id !== productId);

        await user.save();
        req.json(user.cartItems);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        const exsistingItem = user.cartItems.find((item) => item.id === productId);

        if (exsistingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.find((item) => item.id !== productId);
                await user.save();
                return res.json(user.cartItems);
            }
            exsistingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export { addToCart, removeAllFromCart, updateQuantity, getCartProducts, };

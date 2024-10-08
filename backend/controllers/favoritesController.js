export const getFavorites=async(req,res)=>{
    try {
        const favorites=req.user.favorites || [];
        res.json(favorites)
    } catch (error) {
        console.log("Error in getFavoritesProducts controller", error.message); 
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const addToFavorites=async(req,res)=>{
    try {
        const {productId,name,image,price}=req.body

        const user=req.user

        if (!user.favorites) {
            user.favorites = [];
        }

        const existingItem = user.favorites.find((item) => item.productId === productId && item.image === image);

        if (existingItem) {
            return res.status(400).json({ message: "This image of the product is already in favorites." });
        } else {
            user.favorites.push({
                productId,
                name,
                image,
                price
            });
        }

        await user.save();


        res.json(user.favorites);
    } catch (error) {
        console.log("Error in addToFavorites controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removeAllFavorites = async (req, res) => {
    try {
        const user = req.user;

        if (!user.favorites || user.favorites.length === 0) {
            return res.status(400).json({ message: "No favorites to remove." });
        }

        user.favorites = [];
        await user.save();

        res.json({ message: "All favorites have been removed.", favorites: user.favorites });
    } catch (error) {
        console.log("Error in removeAllFavorites controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
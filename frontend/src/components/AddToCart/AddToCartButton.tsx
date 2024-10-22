import { FC } from "react";
import { Button } from "@mui/material";
import { useAddToCartMutation } from "../../redux/services/cartApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slice/authSlice";

interface AddToCartButtonProps {
    name: string;
    productId: string;
    quantity: number;
    price: number;
    selectedImage: string | null;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ name, productId, quantity, price, selectedImage }) => {
    const isAuth = useSelector(isAuthenticated);
    const [addToCart, { isLoading }] = useAddToCartMutation();

    const handleAddToCart = async () => {
        if (!isAuth) {
            toast.error("Please log in to your account or create a new one.");
            return;
        }
        if (!selectedImage) {
            alert("Please select an image");
            return;
        }

        try {
            addToCart({ name, productId, quantity, price, image: selectedImage }).unwrap();
            toast.success("Product added to cart successfully!");
        } catch {
            toast.error("Failed to add product to cart.");
        }
    };

    return (
        <Button onClick={handleAddToCart} disabled={isLoading} variant="contained">
            {isLoading ? "Loading..." : "Add To Cart"}
        </Button>
    );
};

export default AddToCartButton;

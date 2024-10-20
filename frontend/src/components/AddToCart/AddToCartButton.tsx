import { FC } from "react";
import { Button } from "@mui/material";
import { useAddToCartMutation } from "../../redux/services/cartApi";

interface AddToCartButtonProps {
    name: string;
    productId: string;
    quantity: number;
    price: number;
    selectedImage: string | null;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ name, productId, quantity, price, selectedImage }) => {
    const [addToCart, { isLoading,error }] = useAddToCartMutation();

    console.log(error)

    console.log("re-rendering button");

    const handleAddToCart = () => {
        if (!selectedImage) {
            alert("Please select an image");
            return;
        }

        console.log({ productId, quantity, selectedImage });
        addToCart({ name, productId, quantity, price, image: selectedImage });
    };

    return (
        <Button onClick={handleAddToCart} disabled={isLoading} variant="contained">
            {isLoading ? "Loading..." : "Add To Cart"}
        </Button>
    );
};

export default AddToCartButton;

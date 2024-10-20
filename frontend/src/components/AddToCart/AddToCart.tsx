import { FC, useState, useCallback } from "react";
import { Box } from "@mui/material";
import ImageSelector from "./ImageSelector";
import QuantitySelector from "./QuantitySelector";
import { Products } from "../../redux/services/types/products.types";
import AddToCartButton from "./AddToCartButton";

interface AddToBasketProps {
    data: Products;
}

const AddToBasket: FC<AddToBasketProps> = ({ data }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(data?.image[0]);

    const handleImageSelect = useCallback((img: string) => {
        setSelectedImage(img);
    }, []);

    const handleQuantityChange = useCallback((change: number) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
    }, []);
    console.log("re-rendering basket");

    return (
        <Box>
            <ImageSelector images={data.image} selectedImage={selectedImage} onSelectImage={handleImageSelect} />
            <QuantitySelector quantity={quantity} onChangeQuantity={handleQuantityChange} />
            <AddToCartButton quantity={quantity} selectedImage={selectedImage} productId={data._id} price={data.price} name={data.name} />
        </Box>
    );
};

export default AddToBasket;

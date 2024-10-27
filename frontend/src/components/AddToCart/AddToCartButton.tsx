import { FC } from "react";
import { Button } from "@mui/material";
import { useAddToCartMutation } from "../../redux/services/cartApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";

interface AddToCartButtonProps {
    name: string;
    productId: string;
    quantity: number;
    price: number;
    selectedImage: string | null;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ name, productId, quantity, price, selectedImage }) => {
    const { t } = useTranslation();
    const isAuth = useSelector(isAuthenticated);
    const [addToCart, { isLoading }] = useAddToCartMutation();

    const handleAddToCart = async () => {
        if (!isAuth) {
            toast.error(t("login_prompt"));
            return;
        }
        if (!selectedImage) {
            alert(t("select_image_prompt"));
            return;
        }

        try {
            await addToCart({ name, productId, quantity, price, image: selectedImage }).unwrap();
            toast.success(t("product_added_success"));
        } catch {
            toast.error(t("product_add_failed"));
        }
    };

    return (
        <Button onClick={handleAddToCart} disabled={isLoading} variant="contained">
            {isLoading ? t("loading") : t("add_to_cart")}
        </Button>
    );
};

export default AddToCartButton;

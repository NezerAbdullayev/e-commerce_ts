import { IconButton } from "@mui/material";
import { FC } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slice/authSlice";
import { useAddToCartMutation } from "../../redux/services/cartApi";

interface AddtoBasket {
    name: string;
    productId: string;
    image: string;
    price: number;
}

const AddtoBasket: FC<AddtoBasket> = ({ name, productId, image, price }) => {
    const { t } = useTranslation();
    const isAuth = useSelector(isAuthenticated);

    const [addToCart, { isLoading: addCartLoading }] = useAddToCartMutation();

    const onAddToBasket = async () => {
        if (!isAuth) {
            toast.error(t("please_log_in"));
            return;
        }
        try {
            await addToCart({ name, productId, image, price }).unwrap();
            toast.success(t("product_added_to_basket"));
        } catch (error) {
            toast.error(t("failed_to_add_basket"));
            console.error(error);
        }
    };

    return (
        <IconButton aria-label="Add to basket" color="primary" onClick={onAddToBasket} disabled={addCartLoading}>
            <AddShoppingCartIcon className="hover:text-blue-400" />
        </IconButton>
    );
};

export default AddtoBasket;

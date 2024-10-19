import { IconButton } from "@mui/material";
import { FC, useCallback } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRemoveFavoritesItemMutation } from "../../redux/services/favoritesApi";
import { Modal } from "antd";
import { FavoritesProps } from "../../types/globalTypes";
import { useAddToCartMutation } from "../../redux/services/cartApi";
import { toast } from "react-toastify";

const FavoritesControl: FC<FavoritesProps> = ({ id, productId, image, name, price }) => {
    const [removeFavoritesItem, { isLoading: favoritesLoading }] = useRemoveFavoritesItemMutation();

    const [addToCart, { isLoading: cartCoading }] = useAddToCartMutation();

    const onRemoveFavoritesItem = useCallback(async () => {
        Modal.confirm({
            title: "Are you sure you want to remove this item from favorites?",
            okText: "Yes",
            cancelText: "No",
            onOk: async () => {
                try {
                    const res = await removeFavoritesItem({ id }).unwrap();
                    toast.success(`Item removed from favorites: ${res}`);
                } catch (error) {
                    toast.error(`Failed to remove item: ${error}`);
                }
            },
        });
    }, [id, removeFavoritesItem]);

    const onAddToCart = useCallback(async () => {
        Modal.confirm({
            title: "Do you want to add this product to the cart?",
            onOk: async () => {
                try {
                    const res = await addToCart({ productId, image, name, price }).unwrap();
                    console.log(res);
                    console.log(productId, image, name, price);
                } catch (error) {
                    console.log(error);
                }
            },
        });
    }, [addToCart, image, name, price, productId]);

    return (
        <>
            <IconButton aria-label="Save" color="primary" onClick={onAddToCart} disabled={cartCoading}>
                <AddShoppingCartIcon />
            </IconButton>

            <IconButton aria-label="Delete" color="error" onClick={onRemoveFavoritesItem} disabled={favoritesLoading}>
                <DeleteIcon />
            </IconButton>
        </>
    );
};

export default FavoritesControl;

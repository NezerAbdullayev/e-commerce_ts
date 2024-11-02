import { IconButton, TableCell, TableRow } from "@mui/material";
import { FC, memo } from "react";
import { FavorityItem } from "../../globalTypes/globalTypes";

import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useRemoveFavoritesItemMutation } from "../../redux/services/favoritesApi";
import { useAddToCartMutation } from "../../redux/services/cartApi";

import { toast } from "react-toastify";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

interface FavoritesProps extends FavorityItem {
    id: string;
}

const FavoritesItem: FC<FavoritesProps> = ({ id, name, productId, price, image }) => {
    const { t } = useTranslation();

    const [removeFavoritesItem] = useRemoveFavoritesItemMutation();
    const [addToCart, { isLoading: addCartLoading }] = useAddToCartMutation();

    const onRemoveFavoritesItem = async (id: string) => {
        Modal.confirm({
            title: t("confirm_remove_favorite"),
            okText: t("yes"),
            cancelText: t("no"),
            onOk: async () => {
                try {
                    await removeFavoritesItem({ id }).unwrap();
                    toast.success(t("item_removed_from_favorites"));
                } catch (error) {
                    console.error(error);
                    toast.error(t("failed_to_remove_item"));
                }
            },
        });
    };

    const onAddToCart = async () => {
        Modal.confirm({
            title: t("confirm_add_to_cart"),
            onOk: async () => {
                try {
                    await addToCart({ productId, image, name, price }).unwrap();
                } catch (error) {
                    toast.error(t("failed_to_add_to_cart"));
                    console.error(error);
                }
            },
        });
    };

    return (
        <TableRow>
            <TableCell align="center">
                <img src={image} alt={name} className="h-24 w-24 object-cover" />
            </TableCell>

            <TableCell align="center">{name}</TableCell>
            <TableCell align="center">{price}</TableCell>
            <TableCell align="center">
                <IconButton aria-label="Save" color="primary" onClick={onAddToCart} disabled={addCartLoading}>
                    <AddShoppingCartIcon />
                </IconButton>

                <IconButton aria-label="Delete" color="error" onClick={() => onRemoveFavoritesItem(id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default memo(FavoritesItem);

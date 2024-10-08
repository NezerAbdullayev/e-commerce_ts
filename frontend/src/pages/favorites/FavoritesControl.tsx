import { IconButton } from "@mui/material";
import { FC, useCallback } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRemoveFavoritesItemMutation } from "../../redux/services/favoritesApi";
import { Modal } from "antd";

interface FavoritesControlProps {
    id: string;
}

const FavoritesControl: FC<FavoritesControlProps> = ({ id }) => {
    const [removeFavoritesItem, { isLoading: favoritesLoading }] = useRemoveFavoritesItemMutation();

    const onRemoveFavoritesIem = useCallback(async () => {
        Modal.confirm({
            title: "Are you sure you want to remove this item from favorites?",
            okText: "Yes",
            cancelText: "No",
            onOk: async () => {
                try {
                    const res = await removeFavoritesItem({ id }).unwrap();
                    console.log("Item removed from favorites:", res);
                } catch (error) {
                    console.error("Failed to remove item:", error);
                }
            },
        });
    }, [id, removeFavoritesItem]);

    return (
        <>
            <IconButton aria-label="Save" color="primary">
                <AddShoppingCartIcon />
            </IconButton>

            <IconButton aria-label="Delete" color="error" onClick={onRemoveFavoritesIem} disabled={favoritesLoading}>
                <DeleteIcon />
            </IconButton>
        </>
    );
};

export default FavoritesControl;

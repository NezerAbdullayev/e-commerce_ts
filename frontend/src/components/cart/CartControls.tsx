import { IconButton } from "@mui/material";
import { FC, useCallback } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { Modal } from "antd";
import { useRemoveAllCartMutation, useUpdateCartQuantityMutation } from "../../redux/services/cartApi";
import { toast } from "react-toastify";

interface CartControlsProps {
    saveIsActive: boolean;
    quantityEL: number;
    id: string;
}

const CartControls: FC<CartControlsProps> = ({ saveIsActive, quantityEL, id }) => {
    const [updateCartQuantity] = useUpdateCartQuantityMutation();
    const [removeCart] = useRemoveAllCartMutation();

    const onUpdateQuantity = useCallback(() => {
        Modal.confirm({
            title: "Do you want to change the product count?",
            onOk: async () => {
                try {
                    await updateCartQuantity({ quantity: quantityEL, id: id });
                    toast.success("Product quantity updated successfully!");
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to update the product quantity. Please try again.");
                }
            },
            okText: "Yes",
        });
    }, [id, updateCartQuantity, quantityEL]);

    const onDeleteCart = useCallback(() => {
        Modal.confirm({
            title: "Do you want to delete this Cart?",
            onOk: async () => {
                try {
                    await removeCart({ id });
                    toast.success("Cart item deleted successfully!");
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete the cart item. Please try again.");
                }
            },
            okText: "Yes",
            okType: "danger",
        });
    }, [id, removeCart]);

    return (
        <>
            <IconButton aria-label="Save" color="primary" onClick={onUpdateQuantity} disabled={!saveIsActive}>
                <DownloadDoneIcon />
            </IconButton>

            <IconButton aria-label="Delete" color="error" onClick={onDeleteCart}>
                <DeleteIcon />
            </IconButton>
        </>
    );
};

export default CartControls;

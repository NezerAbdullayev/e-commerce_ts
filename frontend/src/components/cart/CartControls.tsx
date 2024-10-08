import { IconButton } from "@mui/material";
import { FC, useCallback } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "antd";
import { useRemoveAllCartMutation, useUpdateCartQuantityMutation } from "../../redux/services/cartApi";

interface CartControlsProps {
    saveIsActive: boolean;
    quantityEL: number;
    productId: string;
}

const CartControls: FC<CartControlsProps> = ({ saveIsActive, quantityEL, productId }) => {
    const [updateCartQuantity] = useUpdateCartQuantityMutation();
    const [removeCart] = useRemoveAllCartMutation();

    console.log("mutation");

    const onUpdateQuantity = useCallback(() => {
        Modal.confirm({
            title: "Do you want to change the product count?",
            onOk: async () => {
                const res = await updateCartQuantity({ quantity: quantityEL, id: productId }).unwrap();
                console.log(res, "burana ona goredirki modal ciaracam ");
            },
            okText: "Yes",
        });
    }, [productId, updateCartQuantity, quantityEL]);

    const onDeleteCart = useCallback(() => {
        Modal.confirm({
            title: "Do you want to delete this Cart?",
            onOk: async () => {
                const res = await removeCart({ productId }).unwrap();
                console.log(res);
            },
            okText: "Yes",
            okType: "danger",
        });
    }, [productId, removeCart]);

    return (
        <>
            <IconButton aria-label="Save" color="primary" onClick={onUpdateQuantity} disabled={!saveIsActive}>
                <SaveIcon />
            </IconButton>

            <IconButton aria-label="Delete" color="error" onClick={onDeleteCart}>
                <DeleteIcon />
            </IconButton>
        </>
    );
};

export default CartControls;

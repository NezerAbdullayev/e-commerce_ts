import { IconButton } from "@mui/material";
import { FC, useCallback } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { Modal } from "antd";
import { useRemoveAllCartMutation, useUpdateCartQuantityMutation } from "../../redux/services/cartApi";

interface CartControlsProps {
    saveIsActive: boolean;
    quantityEL: number;
    id: string;
}

const CartControls: FC<CartControlsProps> = ({ saveIsActive, quantityEL, id }) => {
    const [updateCartQuantity] = useUpdateCartQuantityMutation();
    const [removeCart] = useRemoveAllCartMutation();

    console.log("mutation");

    const onUpdateQuantity = useCallback(() => {
        Modal.confirm({
            title: "Do you want to change the product count?",
            onOk: async () => {
                const res = await updateCartQuantity({ quantity: quantityEL, id: id }).unwrap();
                console.log(res, "burana ona goredirki modal ciaracam ");
            },
            okText: "Yes",
        });
    }, [id, updateCartQuantity, quantityEL]);

    const onDeleteCart = useCallback(() => {
        Modal.confirm({
            title: "Do you want to delete this Cart?",
            onOk: async () => {
                const res = await removeCart({ id }).unwrap();
                console.log(res);
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

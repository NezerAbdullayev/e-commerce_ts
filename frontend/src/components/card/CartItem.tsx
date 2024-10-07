import { Box, IconButton, TableBody, TableCell, Typography } from "@mui/material";
import { FC, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Modal } from "antd";
import { useRemoveAllCartMutation, useUpdateCartQuantityMutation } from "../../redux/services/cartApi";
import SaveIcon from "@mui/icons-material/Save";

interface CartItemProp {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

const CartItem: FC<CartItemProp> = ({ productId, name, image, price, quantity }) => {
    const [quantityEL, setQuantityEl] = useState<number>(quantity);
    const [saveIsActive, setSaveIsActive] = useState<boolean>(false);

    const [updateCartQuantity] = useUpdateCartQuantityMutation();
    const [removeCart] = useRemoveAllCartMutation();

    const onDeleteCart = () => {
        Modal.confirm({
            title: "Do you want to delete this Cart?",
            onOk: async () => {
                console.log(productId);
                const res = await removeCart({ productId });
                console.log(res);
            },
            okText: "Yes",
            okType: "danger",
        });
    };

    const incQuantity = () => {
        setQuantityEl((quantityEL) => quantityEL + 1);
        setSaveIsActive(true);
    };

    const decQuantity = () => {
        setQuantityEl((quantityEL) => (quantityEL <= 1 ? quantity : quantityEL - 1));
        setSaveIsActive(true);
    };

    const onUpdateQuantity = () => {
        Modal.confirm({
            title: "Do you want to change the product count?",
            onOk: async () => {
                const res = await updateCartQuantity({ quantity: quantityEL, id: productId });
                console.log(res, "burana ona goredirki modal ciaracam ");
                setSaveIsActive(false);
            },
            okText: "Yes",
        });
    };

    return (
        <TableBody sx={{ alignItems: "center" }}>
            <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                    <img src={image} className="h-24 w-24 object-cover" />
                    <Typography>{name}</Typography>
                </Box>
            </TableCell>

            <TableCell align="center">
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <IconButton onClick={decQuantity}>
                        <RemoveIcon />
                    </IconButton>
                    <Typography>{quantityEL}</Typography>
                    <IconButton onClick={incQuantity}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </TableCell>

            <TableCell align="center">${price}</TableCell>

            <TableCell align="center">${(price * quantityEL).toFixed(1)}</TableCell>

            <TableCell align="center">
                <IconButton aria-label="Save" color="primary" onClick={onUpdateQuantity} disabled={!saveIsActive}>
                    <SaveIcon />
                </IconButton>

                <IconButton aria-label="Delete" color="error" onClick={onDeleteCart}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableBody>
    );
};

export default CartItem;

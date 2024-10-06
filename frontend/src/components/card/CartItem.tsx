import { Box, IconButton, TableBody, TableCell, Typography } from "@mui/material";
import { FC } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Modal } from "antd";
import { useRemoveAllCartMutation } from "../../redux/services/cartApi";

interface CartItemProp {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

const CartItem: FC<CartItemProp> = ({ productId, name, image, price, quantity }) => {
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

    return (
        <TableBody sx={{ alignItems: "center" }}>
            <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                    <img src={image} className="h-24 w-24" />
                    <Typography>{name}</Typography>
                </Box>
            </TableCell>

            <TableCell align="center">
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <IconButton>
                        <RemoveIcon />
                    </IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                </Box>
            </TableCell>

            <TableCell align="center">${price}</TableCell>

            <TableCell align="center">
                <IconButton onClick={onDeleteCart}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableBody>
    );
};

export default CartItem;

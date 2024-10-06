import { Box, IconButton, TableBody, TableCell, Typography } from "@mui/material";
import { FC } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { string } from "prop-types";

interface CartItemProp {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

const CartItem: FC<CartItemProp> = ({ id, name, image, price, quantity }) => {
    return (
        <TableBody sx={{ alignItems: "center" }}>
            <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                    <img src={image} className="h-20 w-20" />
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
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableBody>
    );
};

export default CartItem;

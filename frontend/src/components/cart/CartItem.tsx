import { Box, IconButton, TableBody, TableCell, Typography } from "@mui/material";
import { FC, memo, useCallback, useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartControls from "./CartControls";

interface CartItemProp {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

const CartItem: FC<CartItemProp> = ({ id, name, image, price, quantity }) => {
    const [quantityEL, setQuantityEl] = useState<number>(quantity);
    const [saveIsActive, setSaveIsActive] = useState<boolean>(false);

    console.log("re-renderings");

    useEffect(() => {
        if (quantityEL !== quantity && !saveIsActive) {
            setSaveIsActive(true);
        } else if (quantityEL == quantity) {
            setSaveIsActive(false);
        }
    }, [quantityEL, quantity, saveIsActive]);

    const incQuantity = useCallback(() => {
        setQuantityEl((quantityEL) => quantityEL + 1);
    }, []);

    const decQuantity = useCallback(() => {
        setQuantityEl((quantityEL) => (quantityEL <= 1 ? quantity : quantityEL - 1));
    }, [quantity]);

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
                <CartControls saveIsActive={saveIsActive} quantityEL={quantityEL} id={id} />
            </TableCell>
        </TableBody>
    );
};

export default memo(CartItem);

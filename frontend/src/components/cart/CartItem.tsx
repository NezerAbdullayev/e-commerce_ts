import { Box, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import DeleteIcon from "@mui/icons-material/Delete";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";

interface CartItemProp {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    onUpdateQuantity: ({ quantity, id }: { quantity: number; id: string }) => void;
    onDeleteCart: (id: string) => void;
}

const CartItem: FC<CartItemProp> = ({ id, name, image, price, quantity, onUpdateQuantity, onDeleteCart }) => {
    const [quantityEL, setQuantityEl] = useState<number>(quantity);
    const [saveIsActive, setSaveIsActive] = useState<boolean>(false);

    useEffect(() => {
        if (quantityEL !== quantity && !saveIsActive) {
            setSaveIsActive(true);
        } else if (quantityEL == quantity) {
            setSaveIsActive(false);
        }
    }, [quantityEL, quantity, saveIsActive]);

    const incQuantity = () => {
        setQuantityEl((quantityEL) => quantityEL + 1);
    };

    const decQuantity = () => {
        setQuantityEl((quantityEL) => (quantityEL <= 1 ? 1 : quantityEL - 1));
    };

    const handleDelete = () => {
        onDeleteCart(id);
    };

    const handleUpdate = () => {
        onUpdateQuantity({ quantity: quantityEL, id });
    };

    return (
        <TableRow sx={{ alignItems: "center" }}>
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
                <IconButton aria-label="Save" color="primary" onClick={handleUpdate} disabled={!saveIsActive}>
                    <DownloadDoneIcon />
                </IconButton>

                <IconButton aria-label="Delete" color="error" onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default memo(CartItem);

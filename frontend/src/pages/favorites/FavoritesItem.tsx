import { IconButton, TableCell, TableRow } from "@mui/material";
import { FC, memo } from "react";
import { FavorityItem } from "../../types/globalTypes";

import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface FavoritesProps extends FavorityItem {
    id: string;
    onRemove: (id: string) => void;
    onAddToCart: (item: FavorityItem) => void;
}

const FavoritesItem: FC<FavoritesProps> = ({ id, name, productId, price, image, onRemove, onAddToCart }) => {
    const handleAddCart = () => {
        onAddToCart({ name, productId, price, image });
    };

    console.log("re-rendering fav");

    return (
        <TableRow>
            <TableCell align="center">
                <img src={image} alt={name} className="h-24 w-24 object-cover" />
            </TableCell>

            <TableCell align="center">{name}</TableCell>
            <TableCell align="center">{price}</TableCell>
            <TableCell align="center">
                <IconButton aria-label="Save" color="primary" onClick={handleAddCart}>
                    <AddShoppingCartIcon />
                </IconButton>

                <IconButton aria-label="Delete" color="error" onClick={() => onRemove(id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default memo(FavoritesItem);

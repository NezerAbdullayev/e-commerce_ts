import { TableCell, TableRow } from "@mui/material";
import { FC, memo } from "react";
import { FavoritesProps } from "../../types/globalTypes";
import FavoritesControl from "./FavoritesControl";

const FavoritesItem: FC<FavoritesProps> = ({ id, name, price, image }) => {
    return (
        <TableRow>
            <TableCell align="center">
                <img src={image} alt={name} className="h-24 w-24 object-cover" />
            </TableCell>

            <TableCell align="center">{name}</TableCell>
            <TableCell align="center">{price}</TableCell>
            <TableCell align="center">
                <FavoritesControl id={id} />
            </TableCell>
        </TableRow>
    );
};

export default memo(FavoritesItem);

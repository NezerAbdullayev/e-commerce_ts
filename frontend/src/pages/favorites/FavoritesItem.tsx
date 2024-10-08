import { Box, TableCell, TableRow } from "@mui/material";

const FavoritesItem = ({ id, productId, name, price, image }) => {
    return (
        <TableRow>
            <TableCell>
                <img src={image} alt={name} className="h-24 w-24 object-cover" />
            </TableCell>

            <TableCell align="center">{name}</TableCell>
            <TableCell align="center">{price}</TableCell>
            <TableCell align="center">
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <div>add to basket</div>
                    <div>delete</div>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default FavoritesItem;

// image: "https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727795428/products/ti1hiuy4ti7eux9kutzz.webp";
// name: "T-shirt C1";
// price: 43.9;
// productId: "66fc10e60687e21c860102d0";
// _id: "670544cb00099894893a44fa";

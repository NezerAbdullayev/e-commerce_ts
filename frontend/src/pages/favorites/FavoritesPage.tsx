import { FC } from "react";

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useGetAllFavoritesQuery } from "../../redux/services/favoritesApi";
import FavoritesItem from "./FavoritesItem";

const FavoritesPage: FC = () => {
    // const favoriteProducts = [];

    const { data: favoriteProducts, isLoading, error } = useGetAllFavoritesQuery();

    console.log(favoriteProducts);

    // image: "https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727795428/products/ti1hiuy4ti7eux9kutzz.webp";
    // name: "T-shirt C1";
    // price: 43.9;
    // productId: "66fc10e60687e21c860102d0";
    // _id: "670544cb00099894893a44fa";

    return (
        <Box className="relative mx-auto mt-10 w-[1280px] max-w-[90%]">
            <Typography variant="h4" gutterBottom className="bg-white">
                Favorites
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    {/* tabel headers */}
                    <TableRow>
                        <TableCell align="center">Image</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>

                    {/* table body */}
                    <TableBody>
                        {favoriteProducts && favoriteProducts.length > 0 ? (
                            favoriteProducts.map((item) => (
                                <FavoritesItem
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    productId={item._productId}
                                />
                            ))
                        ) : (
                            <Typography variant="body1">Product not found</Typography>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default FavoritesPage;

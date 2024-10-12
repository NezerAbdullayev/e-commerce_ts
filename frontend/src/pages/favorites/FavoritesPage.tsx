import { FC, useCallback } from "react";

import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useGetAllFavoritesQuery, useRemoveAllFavoritesMutation } from "../../redux/services/favoritesApi";
import FavoritesItem from "./FavoritesItem";
import Loading from "../../components/Loading";
import Error from "../admin/components/Error";

const FavoritesPage: FC = () => {
    const { data: favoriteProducts, isLoading: favoritesLoading, error: favoritesError } = useGetAllFavoritesQuery();

    const [removeAllFavoritesItems] = useRemoveAllFavoritesMutation();

    const removeAllFavorites = useCallback(async () => {
        try {
            await removeAllFavoritesItems().unwrap();
        } catch (error) {
            console.log(error);
        }
    }, [removeAllFavoritesItems]);
    if (favoritesError) {
        return <Error message="An error occurred while fetching the favorites data." />;
    }

    return (
        <Box className="relative mx-auto mt-10 w-[1280px] max-w-[90%]">
            {favoritesLoading && <Loading />}

            <Typography variant="h4" gutterBottom className="font-bold text-white" align="center">
                Favorites
            </Typography>

            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    {/* tabel headers */}
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell align="center">Name</TableCell>
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
                                    productId={item.productId}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography variant="body1" color="red">
                                        Product not found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Remove All Favorites Button */}
            <Box display="flex" justifyContent="end" mt={2}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={removeAllFavorites}
                    disabled={favoritesLoading || !favoriteProducts || favoriteProducts.length === 0}
                >
                    Remove All Favorites
                </Button>
            </Box>
        </Box>
    );
};

export default FavoritesPage;

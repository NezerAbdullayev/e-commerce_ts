import { FC, useCallback } from "react";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useGetAllFavoritesQuery, useRemoveAllFavoritesMutation } from "../../redux/services/favoritesApi";
import FavoritesItem from "./FavoritesItem";
import Loading from "../../components/Loading";
import Error from "../admin/components/Error";
import { toast } from "react-toastify";

const FavoritesPage: FC = () => {
    const { data: favoriteProducts, isLoading: favoritesLoading, error: favoritesError } = useGetAllFavoritesQuery();

    const [removeAllFavoritesItems] = useRemoveAllFavoritesMutation();

    const removeAllFavorites = useCallback(async () => {
        try {
            await removeAllFavoritesItems();
            toast.success("Favorites cleared successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to clear favorites. Try again.");
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
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* table body */}
                    <TableBody sx={{ alignItems: "center" }}>
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

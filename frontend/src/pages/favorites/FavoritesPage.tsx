import { FC } from "react";

import { Alert, Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useGetAllFavoritesQuery } from "../../redux/services/favoritesApi";
import FavoritesItem from "./FavoritesItem";


const FavoritesPage: FC = () => {
    const { data: favoriteProducts, isLoading: favoritesLoading, error: favoritesError } = useGetAllFavoritesQuery();

    if (favoritesError) {
        return (
            <Box display="flex" justifyContent="center" alignItems={"center"} p={2} minHeight={"100vh"}>
                <Alert severity="error">An error occurred while fetching the favorites data.</Alert>
            </Box>
        );
    }

    return (
        <Box className="relative mx-auto mt-10  w-[1280px] max-w-[90%] ">
            {favoritesLoading && (
                <Box display="flex" justifyContent="center" p={2} position="absolute" className="left-[50%] top-[50%]">
                    <CircularProgress />
                </Box>
            )}

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
                                <FavoritesItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
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

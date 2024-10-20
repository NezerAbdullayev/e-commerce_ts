import { FC, useCallback } from "react";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useGetAllFavoritesQuery, useRemoveAllFavoritesMutation, useRemoveFavoritesItemMutation } from "../../redux/services/favoritesApi";
import FavoritesItem from "./FavoritesItem";
import Loading from "../../components/Loading";
import Error from "../admin/components/Error";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { useAddToCartMutation } from "../../redux/services/cartApi";
import { FavorityItem } from "../../types/globalTypes";

const FavoritesPage: FC = () => {
    const { data: favoriteProducts, isLoading: favoritesLoading, error: favoritesError } = useGetAllFavoritesQuery();

    const [removeAllFavoritesItems] = useRemoveAllFavoritesMutation();

    const [removeFavoritesItem] = useRemoveFavoritesItemMutation();

    const [addToCart] = useAddToCartMutation();

    const onRemoveFavoritesItem = useCallback(
        async (id: string) => {
            Modal.confirm({
                title: "Are you sure you want to remove this item from favorites?",
                okText: "Yes",
                cancelText: "No",
                onOk: async () => {
                    try {
                        await removeFavoritesItem({ id }).unwrap();
                        toast.success("Item removed from favorites successfully!");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to remove item from favorites.");
                    }
                },
            });
        },
        [removeFavoritesItem],
    );

    const onAddToCart = useCallback(
        async ({ productId, image, name, price }: FavorityItem) => {
            Modal.confirm({
                title: "Do you want to add this product to the cart?",
                onOk: async () => {
                    try {
                        await addToCart({ productId, image, name, price }).unwrap();
                        console.log(productId, image, name, price);
                    } catch (error) {
                        toast.error("Failed to add product to cart.");
                        console.error(error);
                    }
                },
            });
        },
        [addToCart],
    );

    const removeAllFavorites = useCallback(async () => {
        try {
            await removeAllFavoritesItems().unwrap();
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
        <Box className="relative mx-auto my-10 w-[1280px] max-w-[90%]">
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
                                    onRemove={onRemoveFavoritesItem}
                                    onAddToCart={onAddToCart}
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

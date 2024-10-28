import { FC, useCallback } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useGetAllFavoritesQuery, useRemoveAllFavoritesMutation, useRemoveFavoritesItemMutation } from "../../redux/services/favoritesApi";
import FavoritesItem from "./FavoritesItem";
import Loading from "../../components/Loading";
import Error from "../admin/components/Error";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { useAddToCartMutation } from "../../redux/services/cartApi";
import { FavorityItem } from "../../globalTypes/globalTypes";
import { useTranslation } from "react-i18next";

const FavoritesPage: FC = () => {
    const { data: favoriteProducts, isLoading: favoritesLoading, error: favoritesError } = useGetAllFavoritesQuery();

    const [removeAllFavoritesItems] = useRemoveAllFavoritesMutation();
    const [removeFavoritesItem] = useRemoveFavoritesItemMutation();
    const [addToCart] = useAddToCartMutation();
    const { t } = useTranslation();

    const onRemoveFavoritesItem = useCallback(
        async (id: string) => {
            Modal.confirm({
                title: t("confirm_remove_favorite"),
                okText: t("yes"),
                cancelText: t("no"),
                onOk: async () => {
                    try {
                        await removeFavoritesItem({ id }).unwrap();
                        toast.success(t("item_removed_from_favorites"));
                    } catch (error) {
                        console.error(error);
                        toast.error(t("failed_to_remove_item"));
                    }
                },
            });
        },
        [removeFavoritesItem, t],
    );

    const onAddToCart = useCallback(
        async ({ productId, image, name, price }: FavorityItem) => {
            Modal.confirm({
                title: t("confirm_add_to_cart"),
                onOk: async () => {
                    try {
                        await addToCart({ productId, image, name, price }).unwrap();
                    } catch (error) {
                        toast.error(t("failed_to_add_to_cart"));
                        console.error(error);
                    }
                },
            });
        },
        [addToCart, t],
    );

    const removeAllFavorites = useCallback(async () => {
        try {
            await removeAllFavoritesItems().unwrap();
            toast.success(t("favorites_cleared"));
        } catch (error) {
            console.error(error);
            toast.error(t("failed_to_clear_favorites"));
        }
    }, [removeAllFavoritesItems, t]);

    if (favoritesError) {
        return <Error message={t("error_fetching_favorites")} />;
    }

    return (
        <Box className="relative mx-auto my-10 w-[1280px] max-w-[90%]">
            {favoritesLoading && <Loading />}

            <Typography variant="h4" gutterBottom className="font-bold text-white" align="center">
                {t("favorites")}
            </Typography>

            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("image")}</TableCell>
                            <TableCell align="center">{t("name")}</TableCell>
                            <TableCell align="center">{t("price")}</TableCell>
                            <TableCell align="center">{t("action")}</TableCell>
                        </TableRow>
                    </TableHead>

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
                                        {t("product_not_found")}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="end" mt={2}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={removeAllFavorites}
                    disabled={favoritesLoading || !favoriteProducts || favoriteProducts.length === 0}
                >
                    {t("remove_all_favorites")}
                </Button>
            </Box>
        </Box>
    );
};

export default FavoritesPage;

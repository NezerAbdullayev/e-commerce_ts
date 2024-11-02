import { Box, Card, CardContent, CardMedia, Grid2 as Grid, IconButton, Rating, Typography } from "@mui/material";
import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router";

import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import { useAddtoFavoritesMutation, useRemoveFavoritesItemMutation } from "../../redux/services/favoritesApi";
import { shallowEqual, useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";
import AddtoBasket from "./AddtoBasket";

interface ProductCardProps {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    isFavorited: boolean;
    favId: string | undefined;
}

const ProductCard: FC<ProductCardProps> = ({ id, name, image, price, rating, isFavorited, favId }) => {
    const isAuth = useSelector(isAuthenticated, shallowEqual);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [addToFavorite, { isLoading: addFavoriteLoading }] = useAddtoFavoritesMutation();
    const [removeFavItem, { isLoading: favRemoveLoading }] = useRemoveFavoritesItemMutation();

    console.log("re-rendering product carts ");

    const onDetailsClick = useCallback(() => {
        navigate(`/product/${id}`);
    }, [navigate, id]);

    const onAddToFavorites = async () => {
        try {
            await addToFavorite({ name, productId: id, image, price });
            toast.success(t("product_added_to_favorites"));
        } catch (error) {
            console.error(error);
            toast.error(t("failed_to_add_favorite"));
        }
    };

    const onDeleteToFavorite = async () => {
        try {
            await removeFavItem({ id: favId }).unwrap();
        } catch (error) {
            toast.error(t("failed_to_add_basket"));
            console.error(error);
        }
    };

    const onToggleFavoriteClick = async () => {
        if (!isAuth) {
            toast.error(t("please_log_in"));
            return;
        }
        if (isFavorited) {
            onDeleteToFavorite();
        } else onAddToFavorites();
    };

    return (
        <Grid size={{ xs: 2, sm: 4, md: 3 }}>
            <Card sx={{ maxWidth: 300, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                {/* image */}
                <Box className="group relative z-10 h-[300px] max-w-[300px] cursor-pointer overflow-hidden rounded">
                    <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                        sx={{ width: "100%", height: 300, objectFit: "cover" }}
                        className="h-full w-full transform transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />

                    <Box className="absolute bottom-3 right-3 z-40 rounded-md bg-stone-50/40">
                        {/* add to favorite */}
                        <IconButton
                            aria-label="Add to favorites"
                            color="error"
                            onClick={onToggleFavoriteClick}
                            disabled={addFavoriteLoading || favRemoveLoading}
                        >
                            <FavoriteIcon
                                className={`w-5 transition-all duration-300 hover:text-red-700 ${isFavorited ? "text-red-700" : "text-stone-50"}`}
                                sx={{ fontSize: 30 }}
                            />
                        </IconButton>
                        {/* add to basket */}
                        <AddtoBasket name={name} productId={id} image={image} price={price} />
                    </Box>

                    <Box
                        onClick={onDetailsClick}
                        className="absolute left-0 top-0 z-10 hidden h-full w-full place-items-center bg-stone-950/30 transition-all group-hover:grid"
                    >
                        <IconButton color="primary" onClick={onDetailsClick}>
                            <VisibilityIcon className="text-stone-300/50" sx={{ fontSize: 40 }} />
                        </IconButton>
                    </Box>
                </Box>

                {/* content */}
                <CardContent>
                    <Box className="flex items-center justify-between gap-5">
                        <Typography component="h4" variant="h6" fontWeight="bold" className="truncate">
                            {name}
                        </Typography>

                        <Typography variant="h6" color="primary" fontWeight="bold">
                            ${price}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body2"
                        component="div"
                        color="text.secondary"
                        className="flex items-center gap-[2px]"
                        sx={{ marginTop: 1 }}
                    >
                        <Box>Rating: </Box>
                        <Rating name="simple-controlled" value={rating} precision={0.5} readOnly />
                        <Box className="font-bold">({rating === 0 ? 0 : rating.toFixed(1)})</Box>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default memo(ProductCard);

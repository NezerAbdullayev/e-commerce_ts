import { Box, Card, CardContent, CardMedia, Grid2 as Grid, IconButton, Rating, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router";

import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAddToCartMutation } from "../../redux/services/cartApi";
import { useAddtoFavoritesMutation } from "../../redux/services/favoritesApi";
import { shallowEqual, useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slice/authSlice";

interface ProductCardProps {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    isFavorited: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ id, name, image, price, rating, isFavorited }) => {
    const isAuth = useSelector(isAuthenticated, shallowEqual);
    // rkt query
    const [addToCart, { isLoading: addCartLoading }] = useAddToCartMutation();
    const [addToFavorite] = useAddtoFavoritesMutation();

    const [value, setValue] = useState<number | null>(rating < 3 ? 3 : rating);
    const navigate = useNavigate();

    const onDetailsClick = useCallback(() => {
        navigate(`/product/${id}`);
    }, [navigate, id]);

    const onAddToFavorites = useCallback(async () => {
        if (!isAuth) {
            alert("no user");
            return;
        }
        try {
            const res = await addToFavorite({ name, productId: id, image, price });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }, [addToFavorite, name, id, image, price, isAuth]);

    const onAddToBasket = useCallback(async () => {
        if (!isAuth) {
            alert("no user");
            return;
        }
        try {
            const res = await addToCart({ name, productId: id, image, price });
            console.log(res, { productId: id });
        } catch (error) {
            console.log(error);
        }
    }, [addToCart, name, id, image, price, isAuth]);

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
                        <IconButton aria-label="Add to favorites" color="error" onClick={onAddToFavorites} disabled={isFavorited}>
                            <FavoriteIcon
                                className={`w-5 transition-all duration-300 hover:text-red-700 ${isFavorited ? "text-red-700" : "text-stone-50"}`}
                                sx={{ fontSize: 30 }}
                            />
                        </IconButton>
                        <IconButton aria-label="Add to basket" color="primary" onClick={onAddToBasket} disabled={addCartLoading}>
                            <AddShoppingCartIcon className="hover:text-blue-400" />
                        </IconButton>
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
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(_, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <Box className="font-bold">({rating < 3 ? 3 : rating}.0)</Box>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ProductCard;

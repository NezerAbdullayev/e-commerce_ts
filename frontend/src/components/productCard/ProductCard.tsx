import { Box, Card, CardContent, CardMedia, Grid2 as Grid, IconButton, Rating, Typography } from "@mui/material";
import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router";

import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { HandlerRes } from "../productsPagination/ProductsPagination";

interface ProductCardProps {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    isFavorited: boolean;
    onAddToFavorites: ({ name, productId, image, price }: HandlerRes) => void;
    onAddToBasket: ({ name, productId, image, price }: HandlerRes) => void;
}

const ProductCard: FC<ProductCardProps> = ({ id, name, image, price, rating, isFavorited, onAddToFavorites, onAddToBasket }) => {
    // rkt query

    const navigate = useNavigate();

    const onDetailsClick = useCallback(() => {
        navigate(`/product/${id}`);
    }, [navigate, id]);

    const handleAddToFavorites = () => {
        onAddToFavorites({ name, productId: id, image, price });
    };

    const handleAddToCart = () => {
        onAddToBasket({ name, productId: id, image, price });
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
                        <IconButton aria-label="Add to favorites" color="error" onClick={handleAddToFavorites} disabled={isFavorited}>
                            <FavoriteIcon
                                className={`w-5 transition-all duration-300 hover:text-red-700 ${isFavorited ? "text-red-700" : "text-stone-50"}`}
                                sx={{ fontSize: 30 }}
                            />
                        </IconButton>
                        <IconButton aria-label="Add to basket" color="primary" onClick={handleAddToCart}>
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
                        <Rating name="simple-controlled" value={rating} precision={0.5}  readOnly />
                        <Box className="font-bold">({rating === 0 ? 0 : rating.toFixed(1)})</Box>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default memo(ProductCard);

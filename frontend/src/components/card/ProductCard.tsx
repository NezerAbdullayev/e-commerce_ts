import { Box, Card, CardContent, CardMedia, Grid2 as Grid, IconButton, Rating, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";

import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface ProductCardProps {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
}

const ProductCard: FC<ProductCardProps> = ({ id, name, image, price, rating }) => {
    const [value, setValue] = useState<number | null>(rating < 3 ? 3 : rating);
    const navigate = useNavigate();

    const onDetailsClick = () => {
        navigate(`/product/${id}`);
    };

    const onFavoritesClick = () => {
        console.log(image, id, name, price);
        // add to favorites
    };

    const onAddToBasket = () => {
        console.log(image, id, name, price, "count +1");
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
                    />

                    <Box className="absolute bottom-3 right-3 z-40 rounded-md bg-stone-50/40">
                        <IconButton aria-label="Add to favorites" color="error" onClick={onFavoritesClick}>
                            <FavoriteIcon
                                className="w-5 text-stone-50 transition-all duration-300 hover:text-red-700"
                                sx={{ fontSize: 30 }}
                            />
                        </IconButton>
                        <IconButton aria-label="Add to basket" color="primary" onClick={onAddToBasket}>
                            <AddShoppingCartIcon className="hover:text-blue-400" />
                        </IconButton>
                    </Box>

                    <Box className="absolute left-0 top-0 z-10 hidden h-full w-full place-items-center bg-stone-950/30 transition-all group-hover:grid">
                        <IconButton color="primary">
                            <VisibilityIcon className="text-stone-300/50" sx={{ fontSize: 40 }} onClick={onDetailsClick} />
                        </IconButton>
                    </Box>
                </Box>

                {/* content */}
                <CardContent>
                    <Box className="flex items-center justify-between">
                        <Typography component="h4" variant="h6" fontWeight="bold">
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

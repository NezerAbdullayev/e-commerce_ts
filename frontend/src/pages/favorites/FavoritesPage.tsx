import { FC } from "react";

import { Container, Typography } from "@mui/material";
import FavoritesList from "./FavoritesList";

const FavoritesPage: FC = () => {
    const favoriteProducts = [];

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Favorites
            </Typography>
            {favoriteProducts.length > 0 ? (
                <FavoritesList products={favoriteProducts} />
            ) : (
                <Typography variant="body1">Product not found</Typography>
            )}
        </Container>
    );
};

export default FavoritesPage;

import { Badge, Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetAllFavoritesQuery } from "../../redux/services/favoritesApi";
import { useGetAllCartQuery } from "../../redux/services/cartApi";

const UserActions: FC = () => {
    const [favCount, setFavCount] = useState<number | null>(null);
    const [cartCount, setCartCount] = useState<number | null>(null);

    const { data: favoritesData } = useGetAllFavoritesQuery();
    const { data: cartData } = useGetAllCartQuery();

    useEffect(() => {
        if (favoritesData && favoritesData.length !== favCount) {
            setFavCount(favoritesData.length);
        }
    }, [favoritesData, favCount]);

    useEffect(() => {
        if (cartData && cartData.length !== cartCount) {
            setCartCount(cartData.length);
        }
    }, [cartData, cartCount]);

    return (
        <Box>
            <IconButton size="large" edge="end" color="inherit" aria-label="Favorites" sx={{ mr: 2 }} component={NavLink} to="/favorites">
                <Badge badgeContent={favCount} color="error">
                    <FavoriteIcon />
                </Badge>
            </IconButton>

            <IconButton component={NavLink} to="/cart" size="large" edge="end" color="inherit" aria-label="Cart" sx={{ mr: 2 }}>
                <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </Box>
    );
};

export default UserActions;

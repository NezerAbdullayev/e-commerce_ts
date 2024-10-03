import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StoreIcon from "@mui/icons-material/Store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Tab, Tabs } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();
    const [navBar, setNavBar] = useState<number|null>(0);

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setNavBar(0);
                break;
            case "/products":
                setNavBar(1);
                break;
            case "/about":
                setNavBar(2);
                break;
            default:
                setNavBar(null);
        }
    }, [location.pathname]);

    return (
        <AppBar position="sticky" sx={{ background: "#102e42" }}>
            <Toolbar>
                <Typography variant="h6" component={NavLink} to="/" sx={{ mr: 2 }}>
                    <StoreIcon sx={{ mr: 1 }} />
                    TrendTee
                </Typography>

                <Tabs
                    textColor="inherit"
                    value={navBar}
                    onChange={(_, value) => setNavBar(value)}
                    indicatorColor="primary"
                    sx={{ flexGrow: 1, display: "flex" }}
                >
                    <Tab label="Home" component={NavLink} to="/" />
                    <Tab label="Products" component={NavLink} to="/products" />
                    <Tab label="About" component={NavLink} to="/about" />
                </Tabs>

                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="Favorites"
                        sx={{ mr: 2 }}
                        component={NavLink}
                        to="/favorites"
                    >
                        <FavoriteIcon />
                    </IconButton>

                    <IconButton size="large" edge="end" color="inherit" aria-label="Cart" sx={{ mr: 2 }}>
                        <ShoppingCartIcon />
                    </IconButton>

                    <Button component={NavLink} to="/login" variant="contained" sx={{ mr: 2, backgroundColor: "#159792" }}>
                        Login
                    </Button>
                    <Button component={NavLink} to="/signup" variant="contained" sx={{ backgroundColor: "#406e84" }}>
                        Sign Up
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

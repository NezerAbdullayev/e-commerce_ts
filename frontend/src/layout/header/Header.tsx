import { useCallback, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StoreIcon from "@mui/icons-material/Store";

import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slice/userSlice";
import { Avatar, Menu, MenuItem } from "@mui/material";
import UserActions from "./UserActions";
import { useUserLogoutMutation } from "../../redux/services/userApi";

function Header() {
    const isAuth = useSelector(isAuthenticated);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [userLogout] = useUserLogoutMutation();

    const location = useLocation();
    const [navBar, setNavBar] = useState<string>("");

    useEffect(() => {
        setNavBar(location.pathname);
    }, [location.pathname]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = useCallback(async () => {
        try {
            await userLogout().unwrap();
        } catch (error) {
            console.error("Logout error:", error);
        }
    }, [userLogout]);

    return (
        <AppBar position="sticky" sx={{ background: "#102e42" }}>
            <Toolbar>
                <Typography variant="h6" component={NavLink} to="/" sx={{ mr: 2 }}>
                    <StoreIcon sx={{ mr: 1 }} />
                    TrendTee
                </Typography>

                <Box sx={{ flexGrow: 1, display: "flex" }}>
                    <Button component={NavLink} to="/" color={navBar === "/" ? "primary" : "inherit"} sx={{ mx: 2 }}>
                        Home
                    </Button>
                    <Button component={NavLink} to="/products" color={navBar === "/products" ? "primary" : "inherit"} sx={{ mx: 2 }}>
                        Products
                    </Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                    {/* favorites and cart */}
                    {isAuth && <UserActions />}

                    {/* login and register */}
                    {!isAuth && (
                        <Box>
                            <Button component={NavLink} to="/login" variant="contained" sx={{ mr: 2, backgroundColor: "#159792" }}>
                                Login
                            </Button>
                            <Button component={NavLink} to="/signup" variant="contained" sx={{ backgroundColor: "#406e84" }}>
                                Sign Up
                            </Button>
                        </Box>
                    )}

                    {/* profile */}
                    {isAuth && (
                        <>
                            <IconButton onClick={handleMenuClick} size="large" color="inherit">
                                <Avatar alt="User Profile" src="/path-to-profile-picture.jpg" />
                            </IconButton>

                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                <MenuItem onClick={handleMenuClose} component={NavLink} to="/profile">
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated, userName } from "../../redux/slice/authSlice";
import { Avatar, Menu, MenuItem } from "@mui/material";
import UserActions from "./UserActions";
import { useUserLogoutMutation } from "../../redux/services/authApi";
import LogoContainer from "../../components/logo/LogoContainer";
import Translate from "../../components/translate/Translate";
import Navbars from "./Navbars";

function Header() {
    const { t } = useTranslation();
    const isAuth = useSelector(isAuthenticated);
    const user = useSelector(userName);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [userLogout] = useUserLogoutMutation();

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await userLogout().unwrap();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AppBar position="sticky" sx={{ background: "#055160" }}>
            <Toolbar>
                {/* logo */}
                <Typography variant="h6" component={NavLink} to="/" sx={{ mr: 2 }} className="relative flex">
                    <LogoContainer />
                </Typography>

                {/* navs */}
                <Navbars />

                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                    {/* translate */}
                    <Translate />

                    {/* favorites and cart */}
                    {isAuth && <UserActions />}

                    {/* login and register */}
                    {!isAuth && (
                        <Box>
                            <Button component={NavLink} to="/login" variant="contained" sx={{ mr: 2, backgroundColor: "#159792" }}>
                                {t("login")}
                            </Button>
                            <Button component={NavLink} to="/signup" variant="contained" sx={{ backgroundColor: "#406e84" }}>
                                {t("signUp")}
                            </Button>
                        </Box>
                    )}

                    {/* profile */}
                    {isAuth && (
                        <>
                            <IconButton onClick={handleMenuClick} size="large" color="inherit">
                                <Avatar alt="User Profile">{user?.[0].toUpperCase()}</Avatar>
                            </IconButton>

                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

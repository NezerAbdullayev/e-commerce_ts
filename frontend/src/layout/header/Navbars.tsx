import { Box, Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

const Navbars: FC = () => {
    const { t } = useTranslation();
    const [navBar, setNavBar] = useState<string>("");
    const location = useLocation();

    useEffect(() => {
        setNavBar(location.pathname);
    }, [location.pathname]);

    return (
        <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Button component={NavLink} to="/" color={navBar === "/" ? "primary" : "inherit"} sx={{ mx: 2 }}>
                {t("home")}
            </Button>
            <Button component={NavLink} to="/products" color={navBar === "/products" ? "primary" : "inherit"} sx={{ mx: 2 }}>
                {t("products")}
            </Button>
        </Box>
    );
};

export default Navbars;

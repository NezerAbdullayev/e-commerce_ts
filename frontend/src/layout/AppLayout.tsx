import { FC } from "react";
import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Box } from "@mui/material";

const AppLayout: FC = () => {
    return (
        <Box>
            <Header />
            <Box sx={{ minHeight: "100vh", mb: 10 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default AppLayout;

import { FC } from "react";
import { Outlet } from "react-router";
import ResponsiveAppBar from "./header/Header";
import Footer from "./footer/Footer";

const AppLayout: FC = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AppLayout;

import { FC } from "react";
import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const AppLayout: FC = () => {
    return (
        <div>
            <Header />
            <div style={{ minHeight: "100vh" }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AppLayout;

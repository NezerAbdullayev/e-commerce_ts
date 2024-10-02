import { FC } from "react";
import { Outlet } from "react-router";

const RootLayout: FC = () => {
    return <Outlet />;
};

export default RootLayout;

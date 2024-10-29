import { FC } from "react";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../redux/slice/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: FC = () => {
    const isAuth = useSelector(isAuthenticated);

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

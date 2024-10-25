import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../redux/slice/authSlice";
import { Navigate } from "react-router";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const isAuth = useSelector(isAuthenticated);

    return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

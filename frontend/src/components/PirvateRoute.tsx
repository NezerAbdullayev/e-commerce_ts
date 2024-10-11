import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../redux/slice/userSlice";
import { Navigate } from "react-router";

interface PirvateRouteProps {
    children: ReactNode;
}

const PirvateRoute: FC<PirvateRouteProps> = ({ children }) => {
    const isAuth = useSelector(isAuthenticated);

    console.log(isAuth, children);

    return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PirvateRoute;

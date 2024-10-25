import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { userRole } from "../redux/slice/authSlice";
import { Navigate } from "react-router";

const IsAdminRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const IsAdmin = useSelector(userRole);

    return IsAdmin === "admin" ? <Navigate to="/admin" replace /> : <>{children}</>;
};

export default IsAdminRoute;

import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface LinkProps {
    children: ReactNode;
    to: string;
}

const Link: FC<LinkProps> = ({ children, to }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center rounded p-2 transition-colors duration-300 ${isActive ? "bg-gray-700 text-white" : "text-gray-50 hover:bg-gray-500"}`
            }
        >
            {children}
        </NavLink>
    );
};

export default Link;

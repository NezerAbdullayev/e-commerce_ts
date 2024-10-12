import { UserState } from "../redux/slice/authSlice";

export const getInitialState = (): UserState => {
    const savedAuth = localStorage.getItem("auth");

    if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);

        const isExpired = new Date().getTime() > parsedAuth.time;

        if (!isExpired) {
            return {
                name: parsedAuth.name,
                role: parsedAuth.role,
                isAuthenticated: parsedAuth.isAuthenticated,
            };
        }
    }

    return {
        name: "",
        role: "",
        isAuthenticated: false,
    };
};

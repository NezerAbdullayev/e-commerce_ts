import { UserState } from "../redux/slice/userSlice";


export const getInitialState = (): UserState => {
    const savedAuth = localStorage.getItem("auth");

    if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);

        const isExpired = new Date().getTime() > parsedAuth.time;

        if (!isExpired) {
            return {
                role: parsedAuth.role,
                isAuthenticated: parsedAuth.isAuthenticated,
            };
        }
    }

    return {
        role: "",
        isAuthenticated: false,
    };
};

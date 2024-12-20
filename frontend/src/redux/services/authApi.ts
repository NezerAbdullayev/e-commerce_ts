import { logout, setUser } from "../slice/authSlice";
import { AUTH_URL } from "../constants";
import { rootApi } from "../rootApi";
import { toast } from "react-toastify";
import { AuthResponse, Login, Signup } from "./types/auth.types";
import { ErrorRes } from "../../globalTypes/globalTypes";

const authApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, Login>({
            query: (user) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: user,
                credentials: "include",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser({ role: data.role, name: data.name }));
                } catch (error) {
                    toast.error((error as ErrorRes).error?.error || "An unexpected error occurred.");
                }
            },
        }),

        signup: builder.mutation<AuthResponse, Signup>({
            query: (newUser) => ({
                url: `${AUTH_URL}/signup`,
                method: "POST",
                body: newUser,
            }),
        }),

        userLogout: builder.mutation<void, void>({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: "POST",
                credentials: "include",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled.then(() => dispatch(logout()));
                } catch (error) {
                    console.error("Login error:", error);
                }
            },
        }),
    }),
});

export const { useLoginMutation, useSignupMutation, useUserLogoutMutation } = authApi;

export default authApi;

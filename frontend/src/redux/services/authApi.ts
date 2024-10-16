import { logout, setUser } from "../slice/authSlice";
import { AUTH_URL } from "../constants";
import { rootApi } from "../rootApi";

const authApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: user,
                credentials: "include",
            }), // _  =user
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser({ role: data.role, name: data.name }));
                } catch (error) {
                    console.error("Login error:", error);
                }
            },
            invalidatesTags: ["Auth"],
        }),

        signup: builder.mutation({
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
                    await queryFulfilled;
                    dispatch(logout());
                } catch (error) {
                    console.error("Login error:", error);
                }
            },
            invalidatesTags: ["Auth"],
        }),
    }),
});

export const { useLoginMutation, useSignupMutation, useUserLogoutMutation } = authApi;

export default authApi;

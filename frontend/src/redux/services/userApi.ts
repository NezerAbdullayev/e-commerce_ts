import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../slice/userSlice";

const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/auth/" }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user,
            }), // _  =user
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser({ role: data.role }));
                } catch (error) {
                    console.error("Login error:", error);
                }
            },
            invalidatesTags: ["Auth"],
        }),
        signup: builder.mutation({
            query: (newUser) => ({
                url: "signup",
                method: "POST",
                body: newUser,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setUser({ role: data.role }));
                } catch (error) {
                    console.error("Login error:", error);
                }
            },
            invalidatesTags: ["Auth"],
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

export default authApi;

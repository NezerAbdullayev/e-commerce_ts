import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartData, CartProps } from "../../types/globalTypes";

const favoritesApi = createApi({
    reducerPath: "favorites",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/cart" }),

    tagTypes: ["Favorites"],
    endpoints: (builder) => ({
        getAllFavorites: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Favorites"],
        }),

        // getAllCart: builder.query<CartData[], void>({
        //     query: () => ({
        //         url: "/",
        //         method: "GET",
        //         credentials: "include",
        //     }),
        //     providesTags: ["Cart"],
        // }),

        // updateCartQuantity: builder.mutation<void, { id: string; quantity: number }>({
        //     query: ({ id, quantity }) => ({
        //         url: `/${id}`,
        //         body: { quantity },
        //         method: "PUT",
        //         credentials: "include",
        //     }),
        //     invalidatesTags: ["Cart"],
        // }),
    }),
});

export const {} = favoritesApi;

export default favoritesApi;

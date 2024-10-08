import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const favoritesApi = createApi({
    reducerPath: "favorites",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/favorites" }),

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
        addtoFavorites: builder.mutation({
            query: ({ productId, name, image, price }) => ({
                url: "/",
                method: "POST",
                body: { productId, name, image, price },
                credentials: "include",
            }),
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

export const { useGetAllFavoritesQuery, useAddtoFavoritesMutation } = favoritesApi;

export default favoritesApi;

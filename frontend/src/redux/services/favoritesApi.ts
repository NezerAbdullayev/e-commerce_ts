import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FavoritesResponse } from "../../types/globalTypes";

const favoritesApi = createApi({
    reducerPath: "favorites",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/favorites" }),

    tagTypes: ["Favorites"],
    endpoints: (builder) => ({
        getAllFavorites: builder.query<FavoritesResponse[], void>({
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
            invalidatesTags: ["Favorites"],
        }),

        removeAllFavorites: builder.mutation<void, void>({
            query: () => ({
                url: "/",
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Favorites"],
        }),
        removeFavoritesItem: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Favorites"],
        }),
    }),
});

export const { useGetAllFavoritesQuery, useAddtoFavoritesMutation, useRemoveFavoritesItemMutation, useRemoveAllFavoritesMutation } =
    favoritesApi;

export default favoritesApi;

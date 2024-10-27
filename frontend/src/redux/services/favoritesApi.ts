import { FavoritesResponse } from "../../globalTypes/globalTypes";
import { rootApi } from "../rootApi";
import { FAVORITES_URL } from "../constants";
import { FavoritesRes } from "./types/favorites.types";

const favoritesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFavorites: builder.query<FavoritesResponse[], void>({
            query: () => ({
                url: `${FAVORITES_URL}/`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Favorites"],
        }),

        addtoFavorites: builder.mutation<void, FavoritesRes>({
            query: ({ productId, name, image, price }) => ({
                url: `${FAVORITES_URL}/`,
                method: "POST",
                body: { productId, name, image, price },
                credentials: "include",
            }),
            invalidatesTags: ["Favorites"],
        }),

        removeAllFavorites: builder.mutation<void, void>({
            query: () => ({
                url: `${FAVORITES_URL}/`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Favorites"],
        }),
        removeFavoritesItem: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `${FAVORITES_URL}/${id}`,
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

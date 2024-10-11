import { CartData, CartProps } from "../../types/globalTypes";
import { CART_URL } from "../constants";

import { rootApi } from "./api";

export const cartApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCart: builder.query<CartData[], void>({
            query: () => ({
                url: `${CART_URL}/`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Cart"],
            keepUnusedDataFor: 5,
        }),

        addToCart: builder.mutation<void, CartProps>({
            query: ({ name, productId, image, price }) => ({
                url: `${CART_URL}/addcart`,
                method: "POST",
                body: { name, productId, image, price },
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
        updateCartQuantity: builder.mutation<void, { id: string; quantity: number }>({
            query: ({ id, quantity }) => ({
                url: `${CART_URL}/${id}`,
                body: { quantity },
                method: "PUT",
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
        removeAllCart: builder.mutation<void, { id?: string }>({
            query: ({ id }) => ({
                url: `${CART_URL}/`,
                body: { id },
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const { useGetAllCartQuery, useAddToCartMutation, useRemoveAllCartMutation, useUpdateCartQuantityMutation } = cartApi;

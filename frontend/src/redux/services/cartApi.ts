import { CART_URL } from "../constants";
import { rootApi } from "../rootApi";
import { CartData, CartProps } from "./types/cart.types";

export const cartApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCart: builder.query<CartData[], void>({
            query: () => ({
                url: `${CART_URL}/`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["CART"],
        }),

        addToCart: builder.mutation<void, CartProps>({
            query: ({ name, productId, image, price, quantity }) => ({
                url: `${CART_URL}/addcart`,
                method: "POST",
                body: { name, productId, image, price, quantity: quantity },
                credentials: "include",
            }),
            invalidatesTags: ["CART"],
        }),

        updateCartQuantity: builder.mutation<void, { id: string; quantity: number }>({
            query: ({ id, quantity }) => ({
                url: `${CART_URL}/${id}`,
                body: { quantity },
                method: "PUT",
                credentials: "include",
            }),
            invalidatesTags: ["CART"],
        }),

        removeAllCart: builder.mutation<void, { id?: string }>({
            query: ({ id }) => ({
                url: `${CART_URL}/`,
                body: { id },
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["CART"],
        }),
    }),
});

export const { useGetAllCartQuery, useAddToCartMutation, useRemoveAllCartMutation, useUpdateCartQuantityMutation } = cartApi;

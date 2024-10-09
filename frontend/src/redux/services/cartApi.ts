import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartData, CartProps } from "../../types/globalTypes";

const cartApi = createApi({
    reducerPath: "cart",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/cart" }),

    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        getAllCart: builder.query<CartData[], void>({
            query: () => ({
                url: "/",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Cart"],
        }),

        addToCart: builder.mutation<void, CartProps>({
            query: ({ name, productId, image, price }) => ({
                url: "/addcart",
                method: "POST",
                body: { name, productId, image, price },
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
        updateCartQuantity: builder.mutation<void, { id: string; quantity: number }>({
            query: ({ id, quantity }) => ({
                url: `/${id}`,
                body: { quantity },
                method: "PUT",
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
        removeAllCart: builder.mutation<void, { id?: string }>({
            query: ({ id }) => ({
                url: `/`,
                body: { id },
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const { useGetAllCartQuery, useAddToCartMutation, useRemoveAllCartMutation, useUpdateCartQuantityMutation } = cartApi;

export default cartApi;

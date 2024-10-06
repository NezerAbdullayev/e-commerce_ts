import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
    reducerPath: "cart",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/cart" }),

    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        getAllCart: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Cart"],
        }),

        addToCart: builder.mutation({
            query: ({ productId }) => ({
                url: "/",
                method: "POST",
                body: productId,
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
        updateCartQuantity: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "PUT",
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
        removeAllCart: builder.mutation({
            query: ({ productId }) => ({
                url: `/`,
                body: productId ? productId : "",
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const { useGetAllCartQuery, useAddToCartMutation, useRemoveAllCartMutation, useUpdateCartQuantityMutation } = cartApi;

export default cartApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
    reducerPath: "cart",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/cart" }),

    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        getAllCart: builder.query<any, void>({
            query: () => ({
                url: "/",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Cart"],
        }),

        addToCart: builder.mutation({
            query: ({ name, productId: id, image, price }) => ({
                url: "/addcart",
                method: "POST",
                body: { name, productId: id, image, price },
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
        updateCartQuantity: builder.mutation({
            query: ({ id, quantity }) => ({
                url: `/${id}`,
                body: { quantity },
                method: "PUT",
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
        removeAllCart: builder.mutation({
            query: ({ productId }) => ({
                url: `/`,
                body: { productId },
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const { useGetAllCartQuery, useAddToCartMutation, useRemoveAllCartMutation, useUpdateCartQuantityMutation } = cartApi;

export default cartApi;

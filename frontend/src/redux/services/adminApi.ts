import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
    reducerPath: "admin",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/products" }),

    tagTypes: ["Admin"],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ page, limit }) => `?page=${page}&limit=${limit}`,
            providesTags: ["Admin"],
        }),
        createNewProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/new",
                method: "POST",
                body: newProduct,
                credentials: "include",
            }),
            invalidatesTags: ["Admin"],
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Admin"],
        }),
    }),
});

export const { useGetAllProductsQuery, useCreateNewProductMutation, useDeleteProductMutation } = adminApi;

export default adminApi;

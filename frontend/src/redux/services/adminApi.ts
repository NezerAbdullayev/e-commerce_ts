import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
    reducerPath: "admin",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/products" }),
    tagTypes: ["Admin"],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ page, limit }) => `?page=${page}&limit=${limit}`,
        }),
        createNewProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/new",
                method: "POST",
                body: newProduct,
                credentials: "include",
            }),
        }),
    }),
});

export const { useGetAllProductsQuery, useCreateNewProductMutation } = adminApi;

export default adminApi;

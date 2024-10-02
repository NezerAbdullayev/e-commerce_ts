import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/products/" }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ page, limit }) => `?page=${page}&limit=${limit}`,
        }),
        getRandomProducts: builder.query({
            query: ({ count }) => `random/${count}`,
        }),
    }),
});

export const { useGetAllProductsQuery, useGetRandomProductsQuery } = productsApi;

export default productsApi;

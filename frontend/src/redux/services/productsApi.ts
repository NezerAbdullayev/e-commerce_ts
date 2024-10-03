import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Products } from "../../types/globalTypes";

const productsApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/products/" }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<Products[], { page: number; limit: number }>({
            query: ({ page, limit }) => `?page=${page}&limit=${limit}`,
        }),
        getRandomProducts: builder.query<Products[], { count: number }>({
            query: ({ count }) => `random/${count}`,
        }),
    }),
});

export const { useGetAllProductsQuery, useGetRandomProductsQuery } = productsApi;

export default productsApi;

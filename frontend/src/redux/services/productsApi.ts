import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Products } from "../../types/globalTypes";

const productsApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/products/" }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<Products[], { page: number; limit: number }>({
            query: ({ page, limit }) => `?page=${page}&limit=${limit}`,
            keepUnusedDataFor: 5,
            providesTags: ["Products"],
        }),

        getRandomProducts: builder.query<Products[], { count: number }>({
            query: ({ count }) => `random/${count}`,
        }),

        getProductsByCategory: builder.query<Products[], { categories: string; page?: number; limit?: number }>({
            query: ({ categories, page = 1, limit = 10 }) => ({
                url: `category/${categories}`,
                params: { page, limit },
            }),
        }),

        getProductById: builder.query<Products, { id: string }>({
            query: ({ id }) => `${id}`,

            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetAllProductsQuery, useGetRandomProductsQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery } = productsApi;

export default productsApi;

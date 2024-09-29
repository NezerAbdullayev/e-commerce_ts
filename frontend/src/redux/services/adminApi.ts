import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
    reducerPath: "admin",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/products" }),
    tagTypes: ["Admin"],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ page, limit }) => `?page=${page}&limit=${limit}`,
        }),
    }),
});

export const { useGetAllProductsQuery } = adminApi;

export default adminApi;

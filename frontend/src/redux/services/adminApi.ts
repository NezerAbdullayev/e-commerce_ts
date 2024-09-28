import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
    reducerPath: "admin",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/auth" }),
    tagTypes: ["Admin"],
    endpoints: (builder) => ({
        AllProduct: builder.query({
            query: () => `/`, //{page,limit}
        }),
    }),
});

export const { useAllProductQuery } = adminApi;

export default adminApi;

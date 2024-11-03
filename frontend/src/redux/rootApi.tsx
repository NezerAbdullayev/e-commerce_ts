import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const rootApi = createApi({
    baseQuery,
    tagTypes: ["PRODUCTS", "USERS", "CATEGORY", "FAVORITES", "CART", "ANALYTICS", "LOGO", "ORDER"],
    endpoints: () => ({}),
});

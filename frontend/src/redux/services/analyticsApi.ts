import { ANALYTICS_URL } from "../constants";
import { rootApi } from "../rootApi";
import { AnalyticsResponse } from "./types/analytics.types";

export const cartApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnalitcs: builder.query<AnalyticsResponse, void>({
            query: () => ({
                url: `${ANALYTICS_URL}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["ANALYTICS"],
        }),
    }),
});

export const { useGetAnalitcsQuery } = cartApi;

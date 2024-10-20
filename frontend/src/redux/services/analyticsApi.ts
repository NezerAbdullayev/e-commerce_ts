import { ANALYTICS_URL } from "../constants";
import { rootApi } from "../rootApi";

export const cartApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnalitcs: builder.query({
            query: () => ({
                url: `${ANALYTICS_URL}`,
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
});

export const { useGetAnalitcsQuery } = cartApi;

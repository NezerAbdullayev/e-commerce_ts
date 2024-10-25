import { rootApi } from "../rootApi";
import { LOGO_URL } from "../constants";
import { LogoResponse } from "./types/logo.types";

const logoApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAppLogo: builder.query<LogoResponse[], void>({
            query: () => ({
                url: `${LOGO_URL}/`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Logo"],
        }),
        updateAppLogo: builder.mutation({
            query: ({ logo }) => ({
                url: `${LOGO_URL}/`,
                method: "GET",
                body: logo,
                credentials: "include",
            }),
            invalidatesTags: ["Logo"],
        }),
    }),
});

export const { useGetAppLogoQuery, useUpdateAppLogoMutation } = logoApi;

export default logoApi;

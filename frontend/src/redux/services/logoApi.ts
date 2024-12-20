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
            providesTags: ["LOGO"],
        }),
        updateAppLogo: builder.mutation<LogoResponse[], { name: string }>({
            query: ({ name }) => ({
                url: `${LOGO_URL}/`,
                method: "PUT",
                body: { name },
                credentials: "include",
            }),
            invalidatesTags: ["LOGO"],
        }),
    }),
});

export const { useGetAppLogoQuery, useUpdateAppLogoMutation } = logoApi;

export default logoApi;

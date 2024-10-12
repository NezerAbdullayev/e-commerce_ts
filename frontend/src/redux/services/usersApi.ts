import { USERS_URL } from "../constants";
import { rootApi } from "../rootApi";

const usersApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        allUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}/`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Users"],
            keepUnusedDataFor: 5,
        }),

        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `${USERS_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useAllUsersQuery, useDeleteUserMutation } = usersApi;

export default usersApi;

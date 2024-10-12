import { UserResponse } from "../../types/globalTypes";
import { USERS_URL } from "../constants";
import { rootApi } from "../rootApi";

// currentPage: 1
// totalPages : 1
// totalUsers:  2
// users :  (2) [{…}, {…}]

const usersApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        allUsers: builder.query<UserResponse, void>({
            query: () => ({
                url: `${USERS_URL}/`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Users"],
            keepUnusedDataFor: 5,
        }),

        deleteUser: builder.mutation<void, { id: string }>({
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

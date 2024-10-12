import { CategoryResponse } from "../../types/globalTypes";
import { CATEGORY_URL } from "../constants";
import { rootApi } from "../rootApi";

const categoryApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query<CategoryResponse[], void>({
            query: () => `${CATEGORY_URL}/`,
            providesTags: ["Category"],
            keepUnusedDataFor: 5,
        }),

        createCategory: builder.mutation({
            query: ({ name }) => ({
                url: `${CATEGORY_URL}/`,
                method: "POST",
                body: name,
                credentials: "include",
            }),
            invalidatesTags: ["Category"],
        }),

        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Category"],
        }),

        updateCategory: builder.mutation({
            query: ({ name, id }) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "PUT",
                body: name,
                credentials: "include",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const { useGetAllCategoryQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoryApi;

export default categoryApi;

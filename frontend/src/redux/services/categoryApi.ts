import { CategoryResponse } from "../../globalTypes/globalTypes";
import { CATEGORY_URL } from "../constants";
import { rootApi } from "../rootApi";

const categoryApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query<CategoryResponse[], void>({
            query: () => `${CATEGORY_URL}/`,
            providesTags: ["CATEGORY"],
        }),

        createCategory: builder.mutation<void, { categoryName: string }>({
            query: ({ categoryName }) => ({
                url: `${CATEGORY_URL}/`,
                method: "POST",
                body: { categoryName },
                credentials: "include",
            }),
            invalidatesTags: ["CATEGORY"],
        }),

        deleteCategory: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["CATEGORY"],
        }),

        updateCategory: builder.mutation<void, { categoryName: string; id: string }>({
            query: ({ categoryName, id }) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "PUT",
                body: { categoryName },
                credentials: "include",
            }),
            invalidatesTags: ["CATEGORY"],
        }),
    }),
});

export const { useGetAllCategoryQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoryApi;

export default categoryApi;

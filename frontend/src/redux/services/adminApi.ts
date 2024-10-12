import { ProductsResponse } from "../../types/globalTypes";
import { ADMIN_PRODUCTS_URL } from "../constants";
import { rootApi } from "../rootApi";

const productsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductsResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => `${ADMIN_PRODUCTS_URL}?page=${page}&limit=${limit}`,
            providesTags: ["Products"],
            keepUnusedDataFor: 5,
        }),
        createNewProduct: builder.mutation({
            query: (newProduct) => ({
                url: `${ADMIN_PRODUCTS_URL}/new`,
                method: "POST",
                body: newProduct,
                credentials: "include",
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `${ADMIN_PRODUCTS_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const { useGetAllProductsQuery, useCreateNewProductMutation, useDeleteProductMutation } = productsApi;

export default productsApi;

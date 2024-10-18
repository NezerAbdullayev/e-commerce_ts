import { PRODUCTS_URL } from "../constants";
import { rootApi } from "../rootApi";
import { Products, ProductsResponse } from "./types/products.types";

const productsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductsResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => `${PRODUCTS_URL}?page=${page}&limit=${limit}`,
            providesTags: ["Products"],
        }),

        getRandomProducts: builder.query<Products[], { count: number }>({
            query: ({ count }) => `${PRODUCTS_URL}/random/${count}`,
            providesTags: (result) =>
                result ? result.map((product) => ({ type: "Products", id: product._id })) : [{ type: "Products", id: "LIST" }],
        }),

        getProductsByCategory: builder.query<Products[], { categories: string; page?: number; limit?: number }>({
            query: ({ categories, page = 1, limit = 10 }) => ({
                url: `${PRODUCTS_URL}/category/${categories}`,
                params: { page, limit },
            }),
        }),

        getProductById: builder.query<Products, { id: string | undefined }>({
            query: ({ id }) => `${PRODUCTS_URL}/${id}`,
        }),

        getTopProducts: builder.query({
            query: () => `${PRODUCTS_URL}/top`,
        }),

        createNewProduct: builder.mutation({
            query: (newProduct) => ({
                url: `${PRODUCTS_URL}/new`,
                method: "POST",
                body: newProduct,
                credentials: "include",
            }),
            invalidatesTags: ["Products"],
        }),

        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Products"],
        }),

        updateProduct: builder.mutation({
            query: (updateProduct) => ({
                url: `${PRODUCTS_URL}/`,
                method: "PUT",
                body: updateProduct,
                credentials: "include",
            }),
            invalidatesTags: ["Products"],
        }),

        createReview: builder.mutation({
            query: ({ productId, review }) => ({
                url: `${PRODUCTS_URL}/${productId}/reviews`,
                method: "POST",
                body: review,
                credentials: "include",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetRandomProductsQuery,
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    useCreateNewProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useCreateReviewMutation,
} = productsApi;

export default productsApi;

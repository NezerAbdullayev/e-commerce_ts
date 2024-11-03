import { PRODUCTS_URL } from "../constants";
import { rootApi } from "../rootApi";
import { Products, ProductsReq, ProductsResponse } from "./types/products.types";

const productsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductsResponse, ProductsReq>({
            query: ({ page, limit, filtersParams }) => {
                const queryParams = {
                    page: page?.toString(),
                    limit: limit?.toString(),
                    search: filtersParams?.search,
                    priceMin: filtersParams?.priceMin?.toString(),
                    priceMax: filtersParams?.priceMax?.toString(),
                    rating: filtersParams?.rating?.toString(),
                    categories: filtersParams?.categories?.length ? filtersParams.categories.join(",") : undefined,
                };

                const queryString = Object.entries(queryParams)
                    .filter(([, value]) => value !== undefined && value !== null && value !== "")
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
                    .join("&");

                return {
                    url: `${PRODUCTS_URL}?${queryString}`,
                };
            },
            providesTags: ["PRODUCTS"],
        }),

        getRandomProducts: builder.query<Products[], { count: number }>({
            query: ({ count }) => `${PRODUCTS_URL}/random/${count}`,
            providesTags: (result) =>
                result ? result.map((product) => ({ type: "PRODUCTS", id: product._id })) : [{ type: "PRODUCTS", id: "LIST" }],
        }),

        getProductsByCategory: builder.query<Products[], { categories: string; page?: number; limit?: number }>({
            query: ({ categories, page = 1, limit = 10 }) => ({
                url: `${PRODUCTS_URL}/category/${categories}`,
                params: { page, limit },
            }),
        }),

        getProductById: builder.query<Products, { id: string | undefined }>({
            query: ({ id }) => `${PRODUCTS_URL}/${id}`,
            providesTags: (result) => (result ? [{ type: "PRODUCTS", id: result._id }] : [{ type: "PRODUCTS", id: "Details" }]),
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
            invalidatesTags: ["PRODUCTS"],
        }),

        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["PRODUCTS"],
        }),

        updateProduct: builder.mutation({
            query: (updateProduct) => ({
                url: `${PRODUCTS_URL}/`,
                method: "PUT",
                body: updateProduct,
                credentials: "include",
            }),
            invalidatesTags: ["PRODUCTS"],
        }),

        createReview: builder.mutation({
            query: ({ productId, review }) => ({
                url: `${PRODUCTS_URL}/${productId}/reviews`,
                method: "POST",
                body: review,
                credentials: "include",
            }),
            async onQueryStarted({ productId }, { dispatch }) {
                dispatch(rootApi.util.invalidateTags([{ type: "PRODUCTS", id: productId }]));
            },
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

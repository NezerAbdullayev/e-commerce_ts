import { rootApi } from "../rootApi";
import { ORDERS_URL } from "../constants";
import { LogoResponse } from "./types/logo.types";
import { CreateOrders } from "./types/order.types";

const ordersApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyOrders: builder.query<LogoResponse[], void>({
            query: () => ({
                url: `${ORDERS_URL}/`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["ORDER"],
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/`,
            }),
        }),
        createOrder: builder.mutation<void, CreateOrders>({
            query: ({ productId, quantity, price }) => ({
                url: `${ORDERS_URL}/`,
                method: "POST",
                body: { productId, quantity, price },
                credentials: "include",
            }),
        }),
        updateOrder: builder.mutation<LogoResponse[], { name: string }>({
            query: ({ name }) => ({
                url: `${ORDERS_URL}/`,
                method: "PUT",
                body: { name },
                credentials: "include",
            }),
            invalidatesTags: ["ORDER"],
        }),
    }),
});

export const { useGetMyOrdersQuery, useGetAllOrdersQuery, useCreateOrderMutation, useUpdateOrderMutation } = ordersApi;

export default ordersApi;

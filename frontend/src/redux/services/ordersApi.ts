import { rootApi } from "../rootApi";
import { ORDERS_URL } from "../constants";
import { CreateOrders, OrdersResponse } from "./types/order.types";

const ordersApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyOrders: builder.query<OrdersResponse[], void>({
            query: () => ({
                url: `${ORDERS_URL}/my-orders`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["ORDER"],
        }),
        getAllOrders: builder.query<OrdersResponse[], void>({
            query: () => ({
                url: `${ORDERS_URL}/`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["ORDER"],
        }),
        createOrder: builder.mutation<void, CreateOrders>({
            query: ({ productId, quantity, price }) => ({
                url: `${ORDERS_URL}/`,
                method: "POST",
                body: { productId, quantity, price },
                credentials: "include",
            }),
            invalidatesTags: ["ORDER"],
        }),
        updateOrder: builder.mutation<void, { status: string; id: string }>({
            query: ({ id, status }) => ({
                url: `${ORDERS_URL}/${id}`,
                method: "PUT",
                body: { status },
                credentials: "include",
            }),
            invalidatesTags: ["ORDER"],
        }),
    }),
});

export const { useGetMyOrdersQuery, useGetAllOrdersQuery, useCreateOrderMutation, useUpdateOrderMutation } = ordersApi;

export default ordersApi;

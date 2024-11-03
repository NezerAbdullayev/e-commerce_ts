import { FC, useCallback } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import PageTitle from "../../../../components/PageTitle";
import OrderRow from "./OrderRow";
import { useGetAllOrdersQuery, useUpdateOrderMutation } from "../../../../redux/services/ordersApi";
import Loading from "../../../../components/Loading";
import Error from "../Error";
import { ErrorRes } from "../../../../globalTypes/globalTypes";

const AdminOrders: FC = () => {
    const { data, isLoading, error } = useGetAllOrdersQuery();

    const [updateOrder] = useUpdateOrderMutation();

    const onUpdateOrder = useCallback(
        async (id: string, status: string) => {
            try {
                await updateOrder({ id, status }).unwrap();
            } catch (error) {
                console.error(error);
            }
        },
        [updateOrder],
    );

    console.log(data);

    return (
        <Box className="relative mx-auto my-10 w-[1280px] max-w-[90%]">
            <PageTitle>Order Management</PageTitle>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    {/* header */}
                    <TableHead>
                        <TableRow>
                            <TableCell>Order</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* body */}
                    <TableBody>
                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <Error message={(error as ErrorRes).error.error} />
                        ) : (
                            data &&
                            data.map((order, index) => (
                                <OrderRow
                                    key={order._id}
                                    index={index + 1}
                                    id={order._id}
                                    user={order.user.name}
                                    status={order.status}
                                    date={order.createdAt}
                                    amount={order.totalAmount}
                                    onUpdate={onUpdateOrder}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminOrders;

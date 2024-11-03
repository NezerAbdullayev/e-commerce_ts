import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import { useGetMyOrdersQuery } from "../../redux/services/ordersApi";
import OrderTable from "./OrderTable";
import Loading from "../../components/Loading";
import Error from "../admin/components/Error";
import { ErrorRes } from "../../globalTypes/globalTypes";

function MyOrders() {
    const { data, isLoading, error } = useGetMyOrdersQuery();

    if (isLoading) return <Loading />;

    if (error) return <Error message={(error as ErrorRes).error?.error} />;

    return (
        <Box className="relative mx-auto my-10 w-[1280px] max-w-[90%]">
            <PageTitle>My Orders</PageTitle>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>product name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((order) => (
                                <OrderTable
                                    key={order._id}
                                    name={order.product.product.name}
                                    createdAt={order.createdAt}
                                    status={order.status}
                                    total={order.totalAmount}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default MyOrders;

import { FC } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import PageTitle from "../../../../components/PageTitle";
import OrderRow from "./OrderRow";

const AdminOrders: FC = () => {
    const orders = [
        { id: "1efe", user: "John Doe", date: "2024-10-15", status: "Completed", amount: "$150.00" },
        { id: "2efe", user: "Jane Smith", date: "2024-10-20", status: "Pending", amount: "$75.50" },
        { id: "3ed", user: "Mike Johnson", date: "2024-10-25", status: "Shipped", amount: "$99.99" },
    ];

    return (
        <Box className="relative mx-auto my-10 w-[1280px] max-w-[90%]">
            <PageTitle>Order Management</PageTitle>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <OrderRow
                                key={order.id}
                                id={order.id}
                                user={order.user}
                                status={order.status}
                                date={order.date}
                                amount={order.amount}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminOrders;

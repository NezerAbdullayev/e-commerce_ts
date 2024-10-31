import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PageTitle from "../../components/PageTitle";

function MyOrders() {
    const orders = [
        { id: 1, date: "2024-10-15", status: "Completed", amount: "$150.00" },
        { id: 2, date: "2024-10-20", status: "Pending", amount: "$75.50" },
        { id: 3, date: "2024-10-25", status: "Shipped", amount: "$99.99" },
    ];

    return (
        <Box className="relative mx-auto my-10 w-[1280px] max-w-[90%]">
            <PageTitle>My Orders</PageTitle>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell align="right">{order.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default MyOrders;

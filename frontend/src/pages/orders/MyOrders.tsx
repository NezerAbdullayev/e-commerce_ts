import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import { useGetMyOrdersQuery } from "../../redux/services/ordersApi";
import OrderTable from "./OrderTable";
import Loading from "../../components/Loading";
import Error from "../admin/components/Error";
import { ErrorRes } from "../../globalTypes/globalTypes";
import { useTranslation } from "react-i18next";

function MyOrders() {
    const { data, isLoading, error } = useGetMyOrdersQuery();
    const { t } = useTranslation();

    if (isLoading) return <Loading />;

    if (error) return <Error message={(error as ErrorRes).error?.error} />;

    return (
        <Box className="relative mx-auto my-10 w-[1280px] max-w-[90%]">
            <PageTitle>{t("My_orders")}</PageTitle>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("product_name")}</TableCell>
                            <TableCell>{t("date")}</TableCell>
                            <TableCell>{t("status")}</TableCell>
                            <TableCell>{t("amount")}</TableCell>
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

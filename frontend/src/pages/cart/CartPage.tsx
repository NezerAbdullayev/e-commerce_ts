import { FC, useCallback } from "react";
import { Alert, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useGetAllCartQuery, useRemoveAllCartMutation, useUpdateCartQuantityMutation } from "../../redux/services/cartApi";
import CartItem from "../../components/cart/CartItem";
import Loading from "../../components/Loading";
import Error from "../admin/components/Error";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCreateOrderMutation } from "../../redux/services/ordersApi";
import { CreateOrderFN } from "../../redux/services/types/order.types";

const CartPage: FC = () => {
    const { t } = useTranslation();
    const { data: userCartData, error, isLoading: cartLoading } = useGetAllCartQuery();

    const [updateCartQuantity] = useUpdateCartQuantityMutation();
    const [removeCart] = useRemoveAllCartMutation();
    const [createOrder] = useCreateOrderMutation();

    const onUpdateQuantity = useCallback(
        ({ quantity, id }: { quantity: number; id: string }) => {
            Modal.confirm({
                title: t("confirm_change_quantity"),
                onOk: async () => {
                    try {
                        await updateCartQuantity({ quantity, id });
                        toast.success(t("quantity_updated_successfully"));
                    } catch (error) {
                        console.error(error);
                        toast.error(t("failed_to_update_quantity"));
                    }
                },
                okText: t("yes"),
            });
        },
        [updateCartQuantity, t],
    );

    const onDeleteCart = useCallback(
        (id: string) => {
            Modal.confirm({
                title: t("confirm_delete_cart"),
                onOk: async () => {
                    try {
                        await removeCart({ id });
                        toast.success(t("cart_item_deleted_successfully"));
                    } catch (error) {
                        console.error(error);
                        toast.error(t("failed_to_delete_cart_item"));
                    }
                },
                okText: t("yes"),
                okType: "danger",
            });
        },
        [removeCart, t],
    );

    const onAddOrder = useCallback(
        ({ productId, price, quantity, id }: CreateOrderFN) => {
            Modal.confirm({
                title: t("confirm_delete_cart"),
                onOk: async () => {
                    try {
                        await createOrder({ productId, price, quantity });
                        await removeCart({ id });
                        toast.success(t("cart_item_deleted_successfully"));
                    } catch (error) {
                        console.error(error);
                        toast.error(t("failed_to_delete_cart_item"));
                    }
                },
                okText: t("yes"),
                okType: "danger",
            });
        },
        [createOrder, removeCart, t],
    );

    if (error) {
        return <Error message={t("error_fetching_cart_data")} />;
    }

    return (
        <Box className="relative mx-auto my-10 w-[1280px] max-w-[90%] py-2.5">
            {cartLoading && <Loading />}

            <TableContainer component={Paper}>
                <Table>
                    {/* table header */}
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("product")}</TableCell>
                            <TableCell align="center">{t("quantity")}</TableCell>
                            <TableCell align="center">{t("price")}</TableCell>
                            <TableCell align="center">{t("total_price")}</TableCell>
                            <TableCell align="center">{t("action")}</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* table body */}
                    <TableBody sx={{ alignItems: "center" }}>
                        {userCartData && userCartData.length > 0 ? (
                            userCartData.map((cart) => (
                                <CartItem
                                    key={cart._id}
                                    id={cart._id}
                                    name={cart.name}
                                    image={cart.image}
                                    price={cart.price}
                                    quantity={cart.quantity}
                                    productId={cart.productId}
                                    onUpdateQuantity={onUpdateQuantity}
                                    onDeleteCart={onDeleteCart}
                                    onAddOrder={onAddOrder}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Box display="flex" justifyContent="center" p={2}>
                                        <Alert severity="warning">{t("cart_empty_warning")}</Alert>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CartPage;

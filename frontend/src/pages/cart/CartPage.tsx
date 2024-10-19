import { FC, memo, useCallback } from "react";

import { Alert, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { useGetAllCartQuery, useRemoveAllCartMutation, useUpdateCartQuantityMutation } from "../../redux/services/cartApi";

import CartItem from "../../components/cart/CartItem";
import Loading from "../../components/Loading";
import Error from "../admin/components/Error";
import { Modal } from "antd";
import { toast } from "react-toastify";
const CartPage: FC = () => {
    const { data: userCartData, error, isLoading: cartLoading } = useGetAllCartQuery();
    const [updateCartQuantity] = useUpdateCartQuantityMutation();
    const [removeCart] = useRemoveAllCartMutation();

    const onUpdateQuantity = useCallback(
        ({ quantity, id }: { quantity: number; id: string }) => {
            Modal.confirm({
                title: "Do you want to change the product count?",
                onOk: async () => {
                    try {
                        await updateCartQuantity({ quantity, id }); //{ quantity: quantityEL, id: id }
                        toast.success("Product quantity updated successfully!");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to update the product quantity. Please try again.");
                    }
                },
                okText: "Yes",
            });
        },
        [updateCartQuantity],
    );

    const onDeleteCart = useCallback(
        (id: string) => {
            Modal.confirm({
                title: "Do you want to delete this Cart?",
                onOk: async () => {
                    try {
                        await removeCart({ id });
                        toast.success("Cart item deleted successfully!");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to delete the cart item. Please try again.");
                    }
                },
                okText: "Yes",
                okType: "danger",
            });
        },
        [removeCart],
    );

    if (error) {
        return <Error message="An error occurred while fetching the cart data." />;
    }

    return (
        <Box className="relative mx-auto my-10 w-[1280px] max-w-[90%] py-2.5">
            {cartLoading && <Loading />}

            <TableContainer component={Paper}>
                <Table>
                    {/* table header */}
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Total Price</TableCell>
                            <TableCell align="center">Action</TableCell>
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
                                    onUpdateQuantity={onUpdateQuantity}
                                    onDeleteCart={onDeleteCart}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Box display="flex" justifyContent="center" p={2}>
                                        <Alert severity="warning">Your cart is empty.</Alert>
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

export default memo(CartPage);

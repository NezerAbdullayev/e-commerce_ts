import { FC } from "react";

import { Alert, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { useGetAllCartQuery } from "../../redux/services/cartApi";

import CartItem from "../../components/cart/CartItem";
import Loading from "../../components/Loading";
const CartPage: FC = () => {
    const { data: userCartData, error, isLoading: cartLoading } = useGetAllCartQuery();

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems={"center"} p={2} minHeight={"100vh"}>
                <Alert severity="error">An error occurred while fetching the cart data.</Alert>
            </Box>
        );
    }

    return (
        <Box className="relative mx-auto mt-10 w-[1280px] max-w-[90%]">
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

export default CartPage;

import { FC } from "react";

import { Alert, Box, CircularProgress, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { useGetAllCartQuery } from "../../redux/services/cartApi";

import CartItem from "../../components/cart/CartItem";
const CartPage: FC = () => {
    const { data: userCartData, error, isLoading: cartLoading } = useGetAllCartQuery();

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems={"center"} p={2} minHeight={"100vh"}>
                <Alert severity="error">An error occurred while fetching the cart data.</Alert>
            </Box>
        );
    }

    console.log("burada cart pagedir ");

    return (
        <Box className="relative mx-auto mt-10 w-[1280px] max-w-[90%]">
            {cartLoading && (
                <Box display="flex" justifyContent="center" p={2} position="absolute" className="left-[50%] top-[50%]">
                    <CircularProgress />
                </Box>
            )}

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
                    {userCartData && userCartData.length > 0 ? (
                        userCartData.map((cart) => (
                            <CartItem
                                key={cart._id}
                                productId={cart.productId}
                                name={cart.name}
                                image={cart.image}
                                price={cart.price}
                                quantity={cart.quantity}
                            />
                        ))
                    ) : (
                        <Box display="flex" justifyContent="center" p={2}>
                            <Alert severity="warning">Your cart is empty.</Alert>
                        </Box>
                    )}
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CartPage;

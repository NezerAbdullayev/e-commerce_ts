import { FC } from "react";

import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { useGetAllCartQuery } from "../../redux/services/cartApi";

import CartItem from "../../components/card/CartItem";
const CartPage: FC = () => {
    const { data: userCartData, error, isLoading } = useGetAllCartQuery();

    console.log("datadir", userCartData);

    return (
        <Box className="mx-auto mt-10 w-[1280px] max-w-[90%]">
            <TableContainer component={Paper}>
                <Table>
                    {/* table header */}
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* table body */}
                    {userCartData?.length > 0 &&
                        userCartData.map((cart) => (
                            <CartItem
                                key={cart._id}
                                productId={cart.productId}
                                name={cart.name}
                                image={cart.image}
                                price={cart.price}
                                quantity={cart.quantity}
                            />
                        ))}
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CartPage;

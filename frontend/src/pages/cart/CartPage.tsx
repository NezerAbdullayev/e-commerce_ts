import { FC, useEffect } from "react";

import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "../../assets/bg-shopping.jpg";
import { useLazyGetAllCartQuery } from "../../redux/services/cartApi";
import { useSelector } from "react-redux";
import { userRole } from "../../redux/slice/userSlice";
import CartItem from "../../components/card/CartItem";
const CartPage: FC = () => {
    const user = useSelector(userRole);
    const [getAllUser, { data: userCartData, error, isLoading }] = useLazyGetAllCartQuery();

    useEffect(() => {
        getAllUser();
    }, [user, getAllUser]);

    console.log("datadir", userCartData);

    //   {  brand: "Zara";
    //     category: ["T-shirt"];
    //     createdAt: "2024-10-01T15:10:30.868Z";
    //     description: "lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun";
    //     image: (3)[
    //         ("https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727795428/products/ti1hiuy4ti7eux9kutzz.webp",
    //         "https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727795429/products/vaf0abytydas8ts7mfdq.webp",
    //         "https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727795430/products/kr9l2kipkqyzrmtkczul.webp")
    //     ];
    //     isFeatured: false;
    //     name: "T-shirt C1";
    //     price: 43.9;
    //     quantity: 1;
    //     rating: 0;
    //     reviews: [];
    //     stock: 10;
    //     updatedAt: "2024-10-01T15:10:30.868Z";
    //     __v: 0;
    //     _id: "66fc10e60687e21c860102d0";}

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
                    {/* {userCartData?.length > 0 &&
                        userCartData.map((cart) => (
                            <CartItem
                                key={cart._id}
                                id={cart.productId}
                                name={cart.name}
                                image={cart.image}
                                price={cart.price}
                                quantity={cart.quantity}
                            />
                        ))} */}

                    <TableBody sx={{ alignItems: "center" }}>
                        <TableCell>
                            <Box display="flex" alignItems="center" gap={2}>
                                <img src={Image} className="h-20 w-20" />
                                <Typography>Product names</Typography>
                            </Box>
                        </TableCell>

                        <TableCell align="center">
                            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                <IconButton>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography>20</Typography>
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </TableCell>

                        <TableCell align="center">$30</TableCell>

                        <TableCell align="center">
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CartPage;

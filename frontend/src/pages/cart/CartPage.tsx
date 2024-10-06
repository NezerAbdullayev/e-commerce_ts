import { FC } from "react";

import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "../../assets/bg-shopping.jpg";
import { useGetAllCartQuery } from "../../redux/services/cartApi";
import { useSelector } from "react-redux";
import { userRole } from "../../redux/slice/userSlice";
const CartPage: FC = () => {
    const { data: userCartData, error, isLoading } = useGetAllCartQuery();
    const role = useSelector(userRole);
    console.log("role", role);
    console.log(userCartData);

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
                    {/* {userCartData && (
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
                    )} */}
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

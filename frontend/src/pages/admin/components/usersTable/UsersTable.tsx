import { Box, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useAllUsersQuery, useDeleteUserMutation } from "../../../../redux/services/usersApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import Loading from "../../../../components/Loading";
import Error from "../Error";
import { Modal } from "antd";

function UsersTable() {
    const { data: allUsersData, isLoading: usersLoading, error: usersError } = useAllUsersQuery();
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = useCallback(
        (_: React.ChangeEvent<unknown>, value: number) => {
            setCurrentPage(value);
        },
        [setCurrentPage],
    );

    // const {}

    console.log(allUsersData);
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

    const onDeleteUserItem = useCallback(
        async (id: string) => {
            Modal.confirm({
                title: "Are you sure you want to delete this user?",
                okText: "Yes",
                cancelText: "No",
                onOk: async () => {
                    try {
                        const res = await deleteUser({ id }).unwrap();
                        console.log("removed from user:", res);
                    } catch (error) {
                        console.error("Failed to remove user:", error);
                    }
                },
            });
        },
        [deleteUser],
    );

    return (
        <Box className="relative mx-auto mt-10 w-[1280px] max-w-[90%]">
            {usersError && <Error message="User data could not be loaded." />} {usersLoading && <Loading />}
            {/* header */}
            <Typography variant="h4" gutterBottom className="font-bold text-white" align="center">
                Total user : {allUsersData?.totalUsers}
            </Typography>
            {/* table  */}
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    {/* tabel headers */}
                    <TableRow>
                        <TableCell align="center">User name</TableCell>
                        <TableCell align="center">User Email</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>

                    {/* table body */}
                    <TableBody>
                        {allUsersData && allUsersData.users.length > 0 ? (
                            allUsersData.users.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell align="center">{item.name}</TableCell>

                                    <TableCell align="center">{item.email}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            aria-label="Delete"
                                            color="error"
                                            onClick={() => onDeleteUserItem(item._id)}
                                            disabled={deleteLoading}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography variant="body1" color="red">
                                        Product not found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt={3} width={"100%"}>
                <Pagination count={allUsersData?.totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
            </Box>
        </Box>
    );
}

export default UsersTable;

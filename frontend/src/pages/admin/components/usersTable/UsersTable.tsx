import {
    Box,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import Loading from "../../../../components/Loading";
import Error from "../Error";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { useAllUsersQuery, useDeleteUserMutation, useLazyGetSearchUsersQuery } from "../../../../redux/services/usersApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { SearchParams } from "../../../../types/globalTypes";

const schema = object({
    searchTerm: string().required("Search term is required"),
});

function UsersTable() {
    const { data: allUsersData, isLoading: usersLoading, error: usersError } = useAllUsersQuery();
    const [deleteUser, { isLoading: deleteLoading, error: deleteError }] = useDeleteUserMutation();
    const [searchUser, { data: searchData, isLoading: searchLoading, error: searchError }] = useLazyGetSearchUsersQuery();

    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
    });

    console.log("re-rendering user table");
    console.log("searchData", searchData);

    const [currentPage, setCurrentPage] = useState<number>(1);
    // const [searchTerm, setSearchTerm] = useState<string>("");

    const handlePageChange = useCallback(
        (_: React.ChangeEvent<unknown>, value: number) => {
            setCurrentPage(value);
        },
        [setCurrentPage],
    );

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

    const onSearch = useCallback(
        async (data: SearchParams) => {
            console.log(data);
            try {
                const res = await searchUser({ search: data.searchTerm }).unwrap();
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            reset();
        },
        [reset, searchUser],
    );

    // qeyd : search etmeyide react hooks form ile edecem
    console.log(allUsersData);

    return (
        <Box className="relative mx-auto mt-10 w-[1280px] max-w-[90%]">
            {usersError && <Error message="User data could not be loaded." />} {usersLoading && <Loading />}
            {/* header */}
            <Typography variant="h4" gutterBottom className="font-bold text-stone-700" align="center">
                Total user : {allUsersData?.totalUsers}
            </Typography>
            {/* search */}
            <Paper
                component="form"
                onSubmit={handleSubmit(onSearch)}
                sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
            >
                <InputBase
                    {...register("searchTerm")}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search by name or email"
                    inputProps={{ "aria-label": "search" }}
                />
                <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" disabled={searchLoading}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            {/* table  */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">User name</TableCell>
                            <TableCell align="center">User Email</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
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
                                <TableCell colSpan={3} align="center">
                                    <Typography variant="body1" color="red">
                                        User not found
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

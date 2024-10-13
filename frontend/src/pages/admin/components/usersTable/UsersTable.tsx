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
import ClearIcon from "@mui/icons-material/Clear";
import { useCallback, useState } from "react";
import Loading from "../../../../components/Loading";
import Error from "../Error";
import { useForm } from "react-hook-form";
import { useAllUsersQuery, useLazyGetSearchUsersQuery } from "../../../../redux/services/usersApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import { SearchParams, UserResponse } from "../../../../types/globalTypes";
import UserTableRow from "./UserTableRow";

const schema = object({
    searchTerm: string().required("Search term is required"),
});

const initialState: UserResponse = { totalUsers: 0, totalPages: 0, currentPage: 1, users: [] };

function UsersTable() {
    const { data: allUsersData, isLoading: usersLoading, error: usersError } = useAllUsersQuery();
    const [searchUser, { isLoading: searchLoading }] = useLazyGetSearchUsersQuery();

    const { register, reset, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchResults, setSearchResults] = useState<UserResponse>(initialState);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handlePageChange = useCallback(
        (_: React.ChangeEvent<unknown>, value: number) => {
            setCurrentPage(value);
        },
        [setCurrentPage],
    );

    const onResetSearchData = useCallback(() => {
        reset();
        setSearchResults(initialState);
        setSearchTerm("");
    }, [reset]);

    const onSearch = useCallback(
        async (data: SearchParams) => {
            const { searchTerm } = data;

            if (searchTerm && searchTerm.trim().length > 0) {
                setSearchTerm(searchTerm);
                try {
                    const res = await searchUser({ search: searchTerm }).unwrap();
                    setSearchResults(res);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        [searchUser],
    );

    const displayUsers = searchTerm.trim() ? searchResults.users : allUsersData?.users || [];

    const hasSearchResults = searchTerm.trim() && searchResults.users.length > 0;
    const hasDefaultUsers = !searchTerm.trim() && allUsersData && allUsersData?.users?.length > 0;

    return (
        <Box className="relative mx-auto mt-10 w-[1280px] max-w-[90%]">
            {usersError && <Error message="User data could not be loaded." />}
            {/* header */}
            <Typography variant="h4" gutterBottom className="font-bold text-stone-700" align="center">
                Total user: {searchResults?.totalUsers || allUsersData?.totalUsers}
            </Typography>
            {/* search */}
            <Paper
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
                className="mx-auto my-5"
                onSubmit={handleSubmit(onSearch)}
            >
                <InputBase
                    {...register("searchTerm")}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search by name or email"
                    inputProps={{ "aria-label": "search" }}
                />
                <IconButton
                    type="submit"
                    sx={{ p: "10px 20px", color: "#000", bgcolor: "#7acdf7", borderRadius: "0", mx: 1, "&:hover": { bgcolor: "#56a6d4" } }}
                    aria-label="search"
                    disabled={searchLoading}
                >
                    <SearchIcon />
                </IconButton>
                <IconButton
                    type="button"
                    sx={{
                        p: "10px",
                        borderRadius: "4px",
                        bgcolor: searchTerm ? "#ff7c7c" : "#f0f0f0",
                        color: searchTerm ? "#fff" : "#000",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                            bgcolor: searchTerm ? "#ff5a5a" : "#e0e0e0",
                        },
                        "&:disabled": {
                            bgcolor: "#f0f0f0",
                            color: "#c0c0c0",
                        },
                    }}
                    aria-label="reset"
                    onClick={onResetSearchData}
                    disabled={searchLoading}
                >
                    <ClearIcon />
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

                    {/* table body */}
                    <TableBody>
                        {searchLoading || usersLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Loading />
                                </TableCell>
                            </TableRow>
                        ) : hasSearchResults || hasDefaultUsers ? (
                            displayUsers.map((item) => <UserTableRow key={item._id} id={item._id} name={item.name} email={item.email} />)
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
            {/* pagination button */}
            <Box display="flex" justifyContent="center" mt={3} width={"100%"}>
                <Pagination count={allUsersData?.totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
            </Box>
        </Box>
    );
}

export default UsersTable;

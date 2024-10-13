import { IconButton, TableCell, TableRow } from "@mui/material";
import { Modal } from "antd";
import { FC, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteUserMutation } from "../../../../redux/services/usersApi";

interface UserTableRowProps {
    id: string;
    name: string;
    email: string;
}

const UserTableRow: FC<UserTableRowProps> = ({ id, name, email }) => {
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
    const onDeleteUserItem = useCallback(async () => {
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
    }, [deleteUser, id]);

    return (
        <TableRow>
            <TableCell align="center">{name}</TableCell>
            <TableCell align="center">{email}</TableCell>
            <TableCell align="center">
                <IconButton aria-label="Delete" color="error" onClick={onDeleteUserItem} disabled={deleteLoading}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default UserTableRow;

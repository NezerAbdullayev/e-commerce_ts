import { Button, MenuItem, Select, TableCell, TableRow } from "@mui/material";
import { FC } from "react";

interface OrderRowProps {
    id: string;
    user: string;
    date: string;
    status: string;
    amount: string;
}

const OrderRow: FC<OrderRowProps> = ({ id, user, date, status, amount }) => {
    return (
        <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{user}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>
                <Select value={status} size="small">
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
            </TableCell>
            <TableCell align="right">{amount}</TableCell>
            <TableCell align="right">
                <Button variant="outlined" color="primary" size="small">
                    View
                </Button>
                <Button variant="outlined" color="secondary" size="small" sx={{ ml: 1 }}>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default OrderRow;

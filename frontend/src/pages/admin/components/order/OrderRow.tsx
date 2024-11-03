import { MenuItem, Select, SelectChangeEvent, TableCell, TableRow } from "@mui/material";
import { FC } from "react";

interface OrderRowProps {
    id: string;
    user: string;
    date: string;
    status: string;
    amount: number;
    index: number;
    onUpdate: (status: string, id: string) => void;
}

const OrderRow: FC<OrderRowProps> = ({ id, user, date, status, amount, index, onUpdate }) => {
    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        const newStatus = event.target.value as string;
        onUpdate(id, newStatus);
    };
    return (
        <TableRow key={id}>
            <TableCell>{index}</TableCell>
            <TableCell>{user}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>
                <Select value={status} size="small" onChange={handleStatusChange}>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
            </TableCell>
            <TableCell align="right">${amount}</TableCell>
        </TableRow>
    );
};

export default OrderRow;

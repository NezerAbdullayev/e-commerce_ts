import { TableCell, TableRow } from "@mui/material";
import { FC } from "react";

interface OrderTableProps {
    name: string;
    createdAt: string;
    status: string;
    total: number;
}

const OrderTable: FC<OrderTableProps> = ({ name, createdAt, status, total }) => {
    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>${total.toFixed(2)}</TableCell>
        </TableRow>
    );
};

export default OrderTable;

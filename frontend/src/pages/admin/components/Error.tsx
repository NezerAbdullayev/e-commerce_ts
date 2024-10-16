import { Alert, Box } from "@mui/material";
import { FC } from "react";

interface ErrorProps {
    message: string;
}

const Error: FC<ErrorProps> = ({ message }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems={"center"} p={2}>
            <Alert severity="error" >{message}</Alert>
        </Box>
    );
};

export default Error;

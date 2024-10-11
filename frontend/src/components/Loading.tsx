import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

const Loading: FC = () => {
    return (
        <Box display="flex" justifyContent="center" p={2} position="absolute" className="left-[50%] top-[50%]">
            <CircularProgress />
        </Box>
    );
};

export default Loading;

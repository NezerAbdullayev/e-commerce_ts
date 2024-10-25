import { Box } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import Logo from "./Logo";
import { FC } from "react";

const LogoContainer: FC = () => {
    return (
        <Box sx={{ position: "relative" }} className="flex items-center gap-1">
            <StoreIcon />
            <Logo />
        </Box>
    );
};

export default LogoContainer;

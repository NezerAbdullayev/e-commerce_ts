import { FC, ReactNode } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AuthContainer: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate("/");
    };
    return (
        <Box minHeight={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box className="mx-auto min-w-[500px] rounded-xl border-2 bg-[#e1daed] px-8 py-14">
                <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBackClick} className="mb-3">
                    Go Home
                </Button>
                {/* children */}
                {children}
            </Box>
        </Box>
    );
};

export default AuthContainer;

import { Box, Grid2 as Grid } from "@mui/material";
import { FC, ReactNode } from "react";

interface CardContainerProps {
    children: ReactNode;
}

const CardContainer: FC<CardContainerProps> = ({ children }) => {
    return (
        <Box className="max-w-[90%] mx-auto">
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 2, md: 3 }}>
                {children}
            </Grid>
        </Box>
    );
};

export default CardContainer;

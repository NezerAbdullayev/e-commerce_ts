import { FC } from "react";
import CaruselContainer from "../../components/CaruselContainer";
import Hero from "../../components/hero/Hero";
import { Box } from "@mui/material";

const HomePage: FC = () => {
    return (
        <Box>
            <Hero />
            <CaruselContainer />
            {/* category filterleme */}
            {/* products  --> 3 product category gore   */}
            {/* <Products /> */}
        </Box>
    );
};

export default HomePage;

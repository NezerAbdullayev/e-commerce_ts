import { FC } from "react";
import CarouselContainer from "../../components/CarouselContainer";
import Hero from "../../components/hero/Hero";
import { Box } from "@mui/material";
import HomeProducts from "./HomeProducts";

const HomePage: FC = () => {
    return (
        <Box>
            <Hero />

            <CarouselContainer />

            <HomeProducts />
        </Box>
    );
};

export default HomePage;

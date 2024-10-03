import { FC } from "react";
import CaruselContainer from "../../components/CaruselContainer";
import Hero from "../../components/hero/Hero";
import { Box } from "@mui/material";
import ProductCard from "../../components/card/ProductCard";

const HomePage: FC = () => {
    return (
        <Box>
            <Hero />
            <CaruselContainer />

            <ProductCard />
            {/* category filterleme */}
            {/* products  --> 3 product category gore   */}
            {/* <Products /> */}
        </Box>
    );
};

export default HomePage;

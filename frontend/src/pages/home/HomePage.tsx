import { FC } from "react";
import CaruselContainer from "../../components/CaruselContainer";
import Hero from "../../components/hero/Hero";
import { Box } from "@mui/material";
import ProductCard from "../../components/card/ProductCard";
import HomeProducts from "./HomeProducts";

const HomePage: FC = () => {
    return (
        <Box>
            <Hero />
            <CaruselContainer />

            {/* <ProductCard /> */}

            <HomeProducts />
            {/* <Products /> */}
        </Box>
    );
};

export default HomePage;

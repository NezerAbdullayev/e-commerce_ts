import { FC } from "react";
import CarouselContainer from "../../components/CarouselContainer";
import Hero from "../../components/hero/Hero";
import { Box } from "@mui/material";
import MediaGallery from "../../components/MediaGallery";

const HomePage: FC = () => {
    return (
        <Box>
            <Hero />
            <CarouselContainer />
            <MediaGallery />
        </Box>
    );
};

export default HomePage;

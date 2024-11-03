import { FC } from "react";
import CarouselContainer from "../../components/CarouselContainer";
import Hero from "../../components/hero/Hero";
import { Box, Container } from "@mui/material";
import MediaGallery from "../../components/MediaGallery";

const HomePage: FC = () => {
    return (
        <Box>
            <Hero />

            <Container maxWidth="xl">
                <CarouselContainer />
                <MediaGallery />
            </Container>
        </Box>
    );
};

export default HomePage;

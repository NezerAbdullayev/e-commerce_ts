import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Video from "../../assets/video_hero .mp4";

const HeroContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    backgroundImage: "url('../../assets/')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    textAlign: "center",
});

const Hero: FC = () => {
    return (
        <Box
            sx={{
                position: "relative",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
            }}
        >
            <Box
                component="video"
                src={Video}
                autoPlay
                loop
                muted
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    minWidth: "100%",
                    minHeight: "100%",
                    width: "auto",
                    height: "auto",
                    zIndex: -1,
                    transform: "translate(-50%, -50%)",
                }}
            />

            <HeroContainer sx={{ color: "#ffffff", backgroundColor: "#ffffff2e", height: "100%" }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    TrendTee Store
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                    Discover amazing products at unbeatable prices!
                </Typography>
            </HeroContainer>
        </Box>
    );
};

export default Hero;

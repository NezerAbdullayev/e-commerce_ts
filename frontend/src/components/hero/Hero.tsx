import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Video from "../../assets/video_hero .mp4";


const HeroContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
    color: "#fff",
});

const Hero: FC = () => {
    return (
        <Box
            sx={{
                position: "relative",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                zIndex: 22,
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
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", 
                    zIndex: -1,
                    transform: "translate(-50%, -50%)",
                }}
            />

            <HeroContainer sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{ fontSize: { xs: "40px", md: "80px" }, fontFamily: "gutterBottom" }}
                >
                    TrendTee Store
                </Typography>
                <Typography
                    variant="h5"
                    component="p"
                    gutterBottom
                    sx={{ fontSize: { xs: "20px", md: "40px" }, fontFamily: "gutterBottom" }}
                >
                    Discover amazing products at unbeatable prices!
                </Typography>
            </HeroContainer>
        </Box>
    );
};

export default Hero;

import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Video from "../../assets/video_hero .mp4";
import Logo from "../logo/Logo";
import { useTranslation } from "react-i18next";

const HeroContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
    color: "#fff",
});

const heroBoxStyles = {
    position: "relative",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    zIndex: 22,
};

const videoStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
    transform: "translate(-50%, -50%)",
};

const heroContainerStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const titleStyles = {
    fontSize: { xs: "40px", md: "80px" },
    fontFamily: "gutterBottom",
};

const subtitleStyles = {
    fontSize: { xs: "20px", md: "40px" },
    fontFamily: "gutterBottom",
};

const Hero: FC = () => {
    const { t } = useTranslation();

    return (
        <Box sx={heroBoxStyles}>
            <Box component="video" src={Video} autoPlay loop muted sx={videoStyles} />
            <HeroContainer sx={heroContainerStyles}>
                <Typography variant="h2" component="h1" gutterBottom sx={titleStyles} className="flex gap-4">
                    <Logo />
                    <Box>
                        <Box>{t("store")}</Box>
                    </Box>
                </Typography>
                <Typography variant="h5" component="p" gutterBottom sx={subtitleStyles}>
                    {t("discoverProducts")}
                </Typography>
            </HeroContainer>
        </Box>
    );
};

export default Hero;

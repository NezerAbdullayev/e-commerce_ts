import { Box, Grid2 as Grid } from "@mui/material";
import { FC } from "react";
import Video from "../assets/video_home_pages.mp4";
import Image_1 from "../assets/img_home_1.avif";
import Image_2 from "../assets/img_home_2.avif";
import Image_3 from "../assets/videoframe_683.png";
import PageTitle from "./PageTitle";
import { useTranslation } from "react-i18next";

const MediaGallery: FC = () => {
    const { t } = useTranslation();
    return (
        <Box mb={10} mt={20} className="mx-auto w-[1280px] max-w-[90%]">
            <PageTitle>{t("galery")}</PageTitle>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <Box component="video" src={Video} autoPlay loop muted />
                </Grid>
                <Grid size={6}>
                    <img src={Image_1} className="h-full" />
                </Grid>
                <Grid size={6}>
                    <img src={Image_2} className="h-full" />
                </Grid>
                <Grid size={6}>
                    <img src={Image_3} className="h-full" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MediaGallery;

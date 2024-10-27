import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

const Translate: FC = () => {
    const { i18n } = useTranslation();
    const [activeLang, setActiveLang] = useState<string>("en");
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setActiveLang(lang);
    };

    return (
        <Box mx={5}>
            <Button
                onClick={() => changeLanguage("az")}
                sx={{
                    color: activeLang === "az" ? "white" : "rgba(255, 255, 255, 0.5)",
                }}
            >
                Az
            </Button>
            <Button
                onClick={() => changeLanguage("en")}
                sx={{
                    color: activeLang === "en" ? "white" : "rgba(255, 255, 255, 0.5)",
                }}
            >
                En
            </Button>
        </Box>
    );
};

export default Translate;

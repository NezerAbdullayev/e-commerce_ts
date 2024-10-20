import { FC, memo } from "react";
import { Box } from "@mui/material";

interface ImageSelectorProps {
    images: string[];
    selectedImage: string | null;
    onSelectImage: (img: string) => void;
}

const ImageSelector: FC<ImageSelectorProps> = ({ images, selectedImage, onSelectImage }) => {
    return (
        <Box mb={2} display="flex" gap={2}>
            {images.map((img, index) => (
                <Box
                    key={index}
                    component="img"
                    src={img}
                    alt={`product-image-${index}`}
                    sx={{
                        width: "70px",
                        height: "70px",
                        border: selectedImage === img ? "2px solid blue" : "1px solid gray",
                        cursor: "pointer",
                    }}
                    onClick={() => onSelectImage(img)}
                />
            ))}
        </Box>
    );
};

export default memo(ImageSelector);

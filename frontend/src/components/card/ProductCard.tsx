import { Box, Button, Card, CardContent, CardMedia, Grid2, Rating, Typography } from "@mui/material";
import { FC, useState } from "react";
import Image from "../../../../../../Downloads/lg_1.webp";
import CardContainer from "./CardContainer";

interface ProductCardProps {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
}

const ProductCard: FC<ProductCardProps> = ({ id, name, image, price, rating }) => {
    const [value, setValue] = useState<number | null>(2);
    return (
        <Grid2 size={{ xs: 2, sm: 4, md: 3 }}>
            <Card sx={{ maxWidth: 300, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <Box className="group overflow-hidden rounded">
                    <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                        sx={{ width: "100%", height: 400, objectFit: "cover", padding: "10px" }}
                        className="h-full w-full transform transition-transform duration-300 group-hover:scale-105"
                    />

                    <Button className="w-full cursor-pointer">Add to cart</Button>
                </Box>

                <CardContent>
                    <Box className="flex items-center justify-between">
                        <Typography component="h4" variant="h6" fontWeight="bold">
                            {name}
                        </Typography>

                        <Typography variant="h6" color="primary" fontWeight="bold">
                            ${price}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body2"
                        component="div"
                        color="text.secondary"
                        className="flex items-center gap-[2px]"
                        sx={{ marginTop: 1 }}
                    >
                        <Box>Rating: </Box>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(_, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <Box className="font-bold">({rating})</Box>
                    </Typography>
                </CardContent>
            </Card>
        </Grid2>
    );
};

export default ProductCard;


// brand: "Zara"
// category: ["T-shirt"]
// createdAt: "2024-10-01T15:10:30.868Z"
// description: "lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun"
// image: ["https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727795428/products/ti1hiuy4ti7eux9kutzz.webp",…]
// isFeatured: false
// name: "T-shirt C1"
// price: 43.9
// rating: 0
// reviews: []
// stock: 10
// updatedAt: "2024-10-01T15:10:30.868Z"
// __v: 0
// _id: "66fc10e60687e21c860102d0"

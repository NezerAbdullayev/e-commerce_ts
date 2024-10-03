import { Box, Button, Card, CardContent, CardMedia, Grid2, Rating, Typography } from "@mui/material";
import { FC, useState } from "react";
import Image from "../../../../../../Downloads/lg_1.webp";
import CardContainer from "./CardContainer";

const ProductCard: FC = ({ id, name, image, price, raiting }) => {
    const [value, setValue] = useState<number | null>(2);
    return (
        <CardContainer>
            {/* <Grid2 size={{ xs: 2, sm: 4, md: 3 }}>
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

                        <Typography variant="body2" color="text.secondary" className="flex items-center gap-[2px]" sx={{ marginTop: 1 }}>
                            <Box>Rating: </Box>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(_, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Box className="font-bold">({raiting})</Box>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2> */}

            <Grid2 size={{ xs: 2, sm: 4, md: 3 }}>
                <Card sx={{ maxWidth: 300, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                    <Box className="group overflow-hidden rounded">
                        <CardMedia
                            component="img"
                            image={Image}
                            alt={"alt"}
                            sx={{ width: "100%", height: 400, objectFit: "cover", padding: "10px" }}
                            className="h-full w-full transform transition-transform duration-300 group-hover:scale-105"
                        />

                        <Button className="w-full cursor-pointer">Add to cart</Button>
                    </Box>

                    <CardContent>
                        <Box className="flex items-center justify-between">
                            <Typography component="h4" variant="h6" fontWeight="bold">
                                T-shirt C1
                            </Typography>

                            <Typography variant="h6" color="primary" fontWeight="bold">
                                $43.80
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" className="flex items-center gap-[2px]" sx={{ marginTop: 1 }}>
                            <Box>Rating: </Box>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(_, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Box className="font-bold">(3.4)</Box>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 size={{ xs: 2, sm: 4, md: 3 }}>
                <Card sx={{ maxWidth: 300, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                    <Box className="group overflow-hidden rounded">
                        <CardMedia
                            component="img"
                            image={Image}
                            alt={"alt"}
                            sx={{ width: "100%", height: 400, objectFit: "cover", padding: "10px" }}
                            className="h-full w-full transform transition-transform duration-300 group-hover:scale-105"
                        />

                        <Button className="w-full cursor-pointer">Add to cart</Button>
                    </Box>

                    <CardContent>
                        <Box className="flex items-center justify-between">
                            <Typography component="h4" variant="h6" fontWeight="bold">
                                T-shirt C1
                            </Typography>

                            <Typography variant="h6" color="primary" fontWeight="bold">
                                $43.80
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" className="flex items-center gap-[2px]" sx={{ marginTop: 1 }}>
                            <Box>Rating: </Box>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(_, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Box className="font-bold">(3.4)</Box>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 size={{ xs: 2, sm: 4, md: 3 }}>
                <Card sx={{ maxWidth: 300, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                    <Box className="group overflow-hidden rounded">
                        <CardMedia
                            component="img"
                            image={Image}
                            alt={"alt"}
                            sx={{ width: "100%", height: 400, objectFit: "cover", padding: "10px" }}
                            className="h-full w-full transform transition-transform duration-300 group-hover:scale-105"
                        />

                        <Button className="w-full cursor-pointer">Add to cart</Button>
                    </Box>

                    <CardContent>
                        <Box className="flex items-center justify-between">
                            <Typography component="h4" variant="h6" fontWeight="bold">
                                T-shirt C1
                            </Typography>

                            <Typography variant="h6" color="primary" fontWeight="bold">
                                $43.80
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" className="flex items-center gap-[2px]" sx={{ marginTop: 1 }}>
                            <Box>Rating: </Box>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(_, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Box className="font-bold">(3.4)</Box>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 size={{ xs: 2, sm: 4, md: 3 }}>
                <Card sx={{ maxWidth: 300, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                    <Box className="group overflow-hidden rounded">
                        <CardMedia
                            component="img"
                            image={Image}
                            alt={"alt"}
                            sx={{ width: "100%", height: 400, objectFit: "cover", padding: "10px" }}
                            className="h-full w-full transform transition-transform duration-300 group-hover:scale-105"
                        />

                        <Button className="w-full cursor-pointer">Add to cart</Button>
                    </Box>

                    <CardContent>
                        <Box className="flex items-center justify-between">
                            <Typography component="h4" variant="h6" fontWeight="bold">
                                T-shirt C1
                            </Typography>

                            <Typography variant="h6" color="primary" fontWeight="bold">
                                $43.80
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" className="flex items-center gap-[2px]" sx={{ marginTop: 1 }}>
                            <Box>Rating: </Box>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(_, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Box className="font-bold">(3.4)</Box>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 size={{ xs: 2, sm: 4, md: 3 }}>
                <Card sx={{ maxWidth: 300, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                    <Box className="group overflow-hidden rounded">
                        <CardMedia
                            component="img"
                            image={Image}
                            alt={"alt"}
                            sx={{ width: "100%", height: 400, objectFit: "cover", padding: "10px" }}
                            className="h-full w-full transform transition-transform duration-300 group-hover:scale-105"
                        />

                        <Button className="w-full cursor-pointer">Add to cart</Button>
                    </Box>

                    <CardContent>
                        <Box className="flex items-center justify-between">
                            <Typography component="h4" variant="h6" fontWeight="bold">
                                T-shirt C1
                            </Typography>

                            <Typography variant="h6" color="primary" fontWeight="bold">
                                $43.80
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" className="flex items-center gap-[2px]" sx={{ marginTop: 1 }}>
                            <Box>Rating: </Box>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(_, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Box className="font-bold">(3.4)</Box>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 size={{ xs: 2, sm: 4, md: 3 }}>
                <Card sx={{ maxWidth: 300, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                    <Box className="group overflow-hidden rounded">
                        <CardMedia
                            component="img"
                            image={Image}
                            alt={"alt"}
                            sx={{ width: "100%", height: 400, objectFit: "cover", padding: "10px" }}
                            className="h-full w-full transform transition-transform duration-300 group-hover:scale-105"
                        />

                        <Button className="w-full cursor-pointer">Add to cart</Button>
                    </Box>

                    <CardContent>
                        <Box className="flex items-center justify-between">
                            <Typography component="h4" variant="h6" fontWeight="bold">
                                T-shirt C1
                            </Typography>

                            <Typography variant="h6" color="primary" fontWeight="bold">
                                $43.80
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" className="flex items-center gap-[2px]" sx={{ marginTop: 1 }}>
                            <Box>Rating: </Box>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(_, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Box className="font-bold">(3.4)</Box>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </CardContainer>
    );
};

export default ProductCard;

{
    /* <div>
    <div className="bg-textWhite2 group relative h-[250px] overflow-hidden rounded">
        <img className="h-full w-full transform transition-transform duration-300 group-hover:scale-110" src={imageUrl} alt={name} />

        {discountRateCalc && (
            <span className="bg-main absolute left-3 top-3 z-20 rounded px-3 py-1 text-sm text-stone-50">{`-${discountRateCalc}%`}</span>
        )}

        <div className="urekk ve goz sekli absolute right-2 top-3 flex flex-col gap-2">
            <span className="block cursor-pointer rounded-full bg-stone-50 p-2">
                <FaRegHeart className="hover:bg-red-8 text-xl hover:text-red-500" />
            </span>
            <span className="block rounded-full bg-stone-50 px-2 py-2">
                <FaEye className="cursor-pointer text-center text-xl" />
            </span>
        </div>

        <button
            className="absolute bottom-[-100%] left-0 z-10 w-full cursor-pointer rounded-bl rounded-br bg-black py-2 tracking-wide text-stone-50 transition-all duration-300 group-hover:bottom-0"
            onClick={() => handleAddProduct(product)}
            disabled={isLoading}
        >
            Add to cart
        </button>
    </div>

    <div className="mt-2.5">
        <div className="text-base">{name}</div>

        {discount ? (
            <div className="text-main">
                ${discount}
                <s className="text-textColor ml-1">${price}</s>
            </div>
        ) : (
            <span className="text-main inline-block">${price}</span>
        )}

        <span>
            <StartRating size={26} />
        </span>
    </div>
</div>; */
}

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

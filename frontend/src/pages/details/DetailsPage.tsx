import { Box, Card, CardContent, CardMedia, Chip, Rating, Tab, Tabs, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../../redux/services/productsApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const DetailsPage: FC = () => {
    // const { id } = useParams();
    const [value, setValue] = useState<number | null>(2);
    const [navBar, setNavBar] = useState<number>(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setNavBar(newValue);
    };

    const id = "66fbfac354d072829dae3ed2";

    // const data = {
    //     brand: "zara",
    //     category: ["T-shirt", "veli", "elder"],
    //     createdAt: "2024-10-01T13:36:03.027Z",
    //     description:
    //         "Printed Crew Neck Plus Size Salas Shirt,\nDIMENSIONS: , XXL: Width 63 cm Length: 74 cm,\nFABRIC: Made of 1st class cotton yarn, does not pill for a long time,\nPRINT: Printed as a screen print with water-based inks that do not contain carcinogens. Not one of the pasted tracks on the site. You can use 30 addresses for a long time.\nWASHING: Wash 30 times and iron reversely.\nCLEANING: cannot be dry cleaned,\nDRYING: Do not hang to dry.",
    //     image: [
    //         "https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727789760/products/ddosvxk79xk7sgpw2ms2.webp",
    //         "https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727789761/products/byfao9af82yc09ldvkb6.webp",
    //         "https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727789762/products/d7hrkvzyr5ovrtyq1lry.webp",
    //     ],
    //     isFeatured: false,
    //     name: "rr Milyor",
    //     price: 80,
    //     rating: 0,
    //     reviews: [],
    //     stock: 30,
    //     updatedAt: "2024-10-01T13:36:03.027Z",
    //     __v: 0,
    //     _id: "66fbfac354d072829dae3ed2",
    // };

    const { data, isLoading, error } = useGetProductByIdQuery({ id });

    return (
        <Box className="flex h-screen items-center justify-center rounded-md">
            {data && (
                <Card className="grid max-w-[900px] grid-cols-2 shadow-lg">
                    {/* carousel  */}
                    <Box>
                        <Swiper
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {data.image?.map((img: string) => (
                                <SwiperSlide key={img}>
                                    <img src={img} className="h-[650px] w-[500px]" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>

                    {/* card content */}
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        {/* name */}
                        <Typography variant="h3" component="h3" sx={{ color: "text.secondary" }}>
                            {data.name}
                        </Typography>

                        {/* categories */}
                        {data?.category?.length > 0 && (
                            <Box className="flex items-center gap-1">
                                {data.category.map((item) => (
                                    <Chip
                                        key={item}
                                        label={item}
                                        sx={{
                                            backgroundColor: "#8b854e",
                                            color: "#d3dbd4",
                                            textTransform: "uppercase",
                                            fontWeight: "bold",
                                        }}
                                    />
                                ))}
                            </Box>
                        )}

                        {/* price and rating */}
                        <Box className="my-2.5 mb-10 mt-2 flex items-center justify-between">
                            <Typography variant="h4" className="text-[#3f3f3d]">
                                ${data.price}
                            </Typography>
                            <Typography
                                variant="body2"
                                component="div"
                                color="text.secondary"
                                className="flex items-center gap-[2px]"
                                sx={{ marginTop: 1 }}
                            >
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(_, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                                <Box className="font-bold">({data.rating})</Box>
                            </Typography>
                        </Box>

                        <Box>
                            <Tabs
                                value={navBar}
                                onChange={handleTabChange}
                                textColor="primary"
                                indicatorColor="primary"
                                aria-label="details page tabs"
                            >
                                <Tab label="Description" />
                                <Tab label="Reviews" />
                            </Tabs>

                            <Box className="mt-4">
                                {navBar === 0 && <Typography variant="body1">{data.description}</Typography>}
                                {navBar === 1 && <Typography variant="body1">No reviews available</Typography>}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

// brand: "zara";
// category: ["T-shirt"];
// createdAt: "2024-10-01T13:36:03.027Z";
// description: "Printed Crew Neck Plus Size Salas Shirt,\nDIMENSIONS: , XXL: Width 63 cm Length: 74 cm,\nFABRIC: Made of 1st class cotton yarn, does not pill for a long time,\nPRINT: Printed as a screen print with water-based inks that do not contain carcinogens. Not one of the pasted tracks on the site. You can use 30 addresses for a long time.\nWASHING: Wash 30 times and iron reversely.\nCLEANING: cannot be dry cleaned,\nDRYING: Do not hang to dry.";
// image: (3)[
//     ("https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727789760/products/ddosvxk79xk7sgpw2ms2.webp",
//     "https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727789761/products/byfao9af82yc09ldvkb6.webp",
//     "https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727789762/products/d7hrkvzyr5ovrtyq1lry.webp")
// ];
// isFeatured: false;
// name: "rr Milyor";
// price: 80;
// rating: 0;
// reviews: [];
// stock: 30;
// updatedAt: "2024-10-01T13:36:03.027Z";
// __v: 0;
// _id: "66fbfac354d072829dae3ed2";

export default DetailsPage;

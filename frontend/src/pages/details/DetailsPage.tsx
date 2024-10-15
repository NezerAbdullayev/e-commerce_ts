import { Box, Card, CardContent, Chip, Rating, Tab, Tabs, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Loading from "../../components/Loading";
import Error from "../admin/components/Error";
import { useGetProductByIdQuery } from "../../redux/services/productsApi";

const DetailsPage: FC = () => {
    const { id } = useParams();
    const [value, setValue] = useState<number | null>(2);
    const [navBar, setNavBar] = useState<number>(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setNavBar(newValue);
    };

    const { data, isLoading, error } = useGetProductByIdQuery({ id });

    console.log(error?.data?.message);

    return (
        <Box className="flex h-screen items-center justify-center rounded-md">
            {isLoading && <Loading />}
            {error && <Error message={error.data?.message || "Products not found"} />}
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
                                        key={item._id}
                                        label={item.name}
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

export default DetailsPage;

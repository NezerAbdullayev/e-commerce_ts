import { Box, Card, CardContent, Chip, Divider, Rating, Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Loading from "../../components/Loading";
import Error from "../admin/components/Error";
import { useGetProductByIdQuery } from "../../redux/services/productsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import AddToBasket from "../../components/AddToCart/AddToCart";

const DetailsPage: FC = () => {
    const { id } = useParams();

    const { data, isLoading, error } = useGetProductByIdQuery(id ? { id } : skipToken);
    console.log(data);

    return (
        <Box className="bg-stone-50">
            {isLoading ? (
                <Loading />
            ) : error ? (
                <Error message={"There was an error fetching the product details."} />
            ) : (
                data && (
                    <Card className="h-screen">
                        <Box mt={10} className="flex h-full gap-10 shadow-lg">
                            {/* carousel  */}
                            <Box width={450} height={550} ml={5}>
                                <Swiper
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {data.image?.map((img: string) => (
                                        <SwiperSlide key={img} className="h-[550px] w-[450px]">
                                            <img src={img} className="h-full w-full object-cover" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>

                            {/* card content */}
                            <CardContent className="w-full">
                                <Box>
                                    {/* name */}
                                    <Typography variant="h4" component="h3" sx={{ color: "text.secondary" }}>
                                        {data.name}
                                    </Typography>
                                    {/* categories */}
                                    {data?.category?.length > 0 && (
                                        <Box className="my-4 flex items-center gap-1">
                                            <Typography>Categories: </Typography>
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

                                    {data?.brand && (
                                        <Box className="my-1 flex items-center gap-1">
                                            <Typography>Brand: </Typography>
                                            <Typography>{data.brand}</Typography>
                                        </Box>
                                    )}

                                    {/* price  and rating*/}
                                    <Box display="flex" justifyContent="space-between" marginX={3}>
                                        <Typography variant="h4" className="text-[#3f3f3d]">
                                            ${data.price}
                                        </Typography>

                                        <Box display={"flex"} alignItems="center">
                                            <Rating name="simple-controlled" value={data.rating} />
                                            <Box className="font-bold">({data.rating === 0 ? 0 : data.rating.toFixed(1)})</Box>
                                        </Box>
                                    </Box>

                                    <Divider />
                                </Box>

                                {/* description and review */}
                                <Box className="mt-10">
                                    <AddToBasket data={data} />
                                </Box>
                            </CardContent>
                        </Box>
                        {/* <DetailsBar productData={data} /> */}
                    </Card>
                )
            )}
        </Box>
    );
};

export default DetailsPage;

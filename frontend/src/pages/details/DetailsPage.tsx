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
import DetailsBar from "./DetailsBar";
import { useTranslation } from "react-i18next";

const DetailsPage: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const { data, isLoading, error } = useGetProductByIdQuery(id ? { id } : skipToken);

    return (
        <Box className="bg-stone-50">
            {isLoading ? (
                <Loading />
            ) : error ? (
                <Error message={t("error_fetching_details_data")} />
            ) : (
                data && (
                    <Card className="min-h-screen py-2">
                        <Box mt={10} pb={1} className="flex h-full gap-10 shadow-lg">
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
                                    {data.category?.length > 0 && (
                                        <Box className="my-4 flex items-center gap-1">
                                            <Typography>{t("categories")}: </Typography>
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
                                            <Typography>{t("brand")}: </Typography>
                                            <Typography>{data.brand}</Typography>
                                        </Box>
                                    )}

                                    {/* price  and rating*/}
                                    <Box display="flex" justifyContent="space-between" marginX={3}>
                                        <Typography variant="h4" className="text-[#3f3f3d]">
                                            ${data.price}
                                        </Typography>

                                        {/* rating */}
                                        <Box display={"flex"} alignItems="center">
                                            <Rating name="simple-controlled" value={data.rating} precision={0.5} readOnly />
                                            <Box className="font-bold">({data.rating === 0 ? 0 : data.rating.toFixed(1)})</Box>
                                        </Box>
                                    </Box>

                                    <Divider />
                                </Box>

                                {/* add to cart  */}
                                <Box className="mt-10">
                                    <AddToBasket data={data} />
                                </Box>
                            </CardContent>
                        </Box>

                        <Box minHeight={"50vh"} my={8} className="mx-auto w-[1280px] max-w-[90%]">
                            <DetailsBar productData={data} />
                        </Box>
                    </Card>
                )
            )}
        </Box>
    );
};

export default DetailsPage;

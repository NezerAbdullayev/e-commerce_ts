import { FC } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Box } from "@mui/material";
import { useGetRandomProductsQuery } from "../redux/services/productsApi";
import Loading from "./Loading";

const CarouselContainer: FC = () => {
    const { data, isLoading, error } = useGetRandomProductsQuery({ count: 8 });

    return (
        <Box className="mx-auto max-w-[90%]" sx={{ margin: "80px auto " }}>
            {isLoading ? (
                <Loading />
            ) : data ? (
                <Swiper spaceBetween={30} slidesPerView={4} navigation modules={[Navigation, Autoplay]} autoplay={{ delay: 3000 }}>
                    {data &&
                        data?.length > 0 &&
                        data.map((product) => (
                            <SwiperSlide key={product._id}>
                                <img
                                    src={product?.image?.[0]}
                                    alt={product.name}
                                    className="h-[300px] w-[300px] cursor-pointer rounded object-cover transition-all hover:opacity-60"
                                />
                            </SwiperSlide>
                        ))}
                </Swiper>
            ) : (
                ""
            )}
        </Box>
    );
};

export default CarouselContainer;

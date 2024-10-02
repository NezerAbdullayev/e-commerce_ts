import { FC } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Autoplay } from "swiper/modules";
import { useGetRandomProductsQuery } from "../redux/services/productsApi";
import { Box } from "@mui/material";

const CaruselContainer: FC = () => {
    const { data, isLoading, error } = useGetRandomProductsQuery({ count: 8 });

    console.log(data);

    return (
        <Box sx={{ margin: "80px 0 " }}>
            <Swiper spaceBetween={30} slidesPerView={4} navigation modules={[Navigation, Autoplay]} autoplay={{ delay: 3000 }}>
                {data?.length > 0 &&
                    data.map((product) => (
                        <SwiperSlide key={product._id}>
                            <img src={product?.image?.[0]} alt={product.name} className="h-[300px] w-[300px] object-cover" />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </Box>
    );
};

export default CaruselContainer;

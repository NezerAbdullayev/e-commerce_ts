import { FC } from "react";
import CaruselContainer from "../../components/CaruselContainer";
import Hero from "../../components/hero/Hero";

const HomePage: FC = () => {
    return (
        <div>
            <Hero />
            <CaruselContainer />
            {/* category filterleme */}
            {/* products  --> 3 product category gore   */}
            {/* <Products /> */}
        </div>
    );
};

export default HomePage;

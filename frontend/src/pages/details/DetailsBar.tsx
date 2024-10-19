import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FC, useState } from "react";
import Review from "../../components/review/Review";
import AddNewReview from "../../components/review/AddNewReview";
import { Products } from "../../redux/services/types/products.types";

interface DetailsBarRespons {
    productData: Products;
}

const DetailsBar: FC<DetailsBarRespons> = ({ productData }) => {
    console.log(productData);
    const [navBar, setNavBar] = useState<number>(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setNavBar(newValue);
    };
    return (
        <>
            <Tabs value={navBar} onChange={handleTabChange} textColor="primary" indicatorColor="primary" aria-label="details page tabs">
                <Tab label="Description" />
                <Tab label="Reviews" />
                <Tab label="Add review" />
            </Tabs>
            <Box>
                {navBar === 0 && (
                    <Typography variant="body1" sx={{ overflowY: "auto" }} className="h-[50%] overflow-auto">
                        {productData.description}
                    </Typography>
                )}
                {navBar === 1 && <Review  />}
                {navBar === 2 && <AddNewReview productId={productData._id} />}
            </Box>
        </>
    );
};

export default DetailsBar;

import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { useGetAllCartQuery } from "../../redux/services/cartApi";

const AddToOrdersContainer: FC = () => {
    const { data: userCartData, error, isLoading: cartLoading } = useGetAllCartQuery();

    console.log(userCartData);

    const handleAddToOrder = () => {
        console.log("Order submitted!");
    };

    return (
        <Box className="flex h-[350px] flex-col justify-between rounded-md border-2 border-[#ccc] bg-[#c7c7c7] p-4">
            <Typography variant="h6">Səbət Məlumatları</Typography>
            <Button variant="contained" color="primary" onClick={handleAddToOrder} className="mt-4">
                sebete elave edin
            </Button>
        </Box>
    );
};

export default AddToOrdersContainer;

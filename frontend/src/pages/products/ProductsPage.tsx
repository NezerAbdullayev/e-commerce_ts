import { Box, TextField } from "@mui/material";
import { FC } from "react";
import ProductsPagination from "../../components/productsPagination/ProductsPagination";

const ProductsPage: FC = () => {
    return (
        <Box className="my-10">
            {/* search */}
            <Box sx={{ width: 500, maxWidth: "100%", mx: "auto" }}>
                <TextField fullWidth label="Search" id="Search" />
            </Box>

            <Box>
                <ProductsPagination />
            </Box>
        </Box>
    );
};

export default ProductsPage;

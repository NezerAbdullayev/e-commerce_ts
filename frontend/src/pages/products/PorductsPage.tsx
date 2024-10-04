import { Box, TextField } from "@mui/material";
import { FC } from "react";
import ProductCard from "../../components/card/ProductCard";
import ProductsPagination from "../../components/productsPagination/ProductsPagination";

const ProductsPage: FC = () => {
    return (
        <Box>
            {/* search */}
            <Box sx={{ width: 500, maxWidth: "100%", mx: "auto" }}>
                <TextField fullWidth label="fullWidth" id="fullWidth" />
            </Box>

            <Box>
                <ProductsPagination />
            </Box>
        </Box>
    );
};

export default ProductsPage;

import { Box } from "@mui/material";
import { FC } from "react";
import ProductsPagination from "../../components/productsPagination/ProductsPagination";
import Filters from "../../components/filter/Filters";

const ProductsPage: FC = () => {
    return (
        <Box className="my-10">
            {/* filters and search  */}
            <Box sx={{ width: 500, maxWidth: "100%", mx: "auto" }}>
                <Filters />
            </Box>

            <Box>
                <ProductsPagination />
            </Box>
        </Box>
    );
};

export default ProductsPage;

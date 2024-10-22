import { Box } from "@mui/material";
import { FC, useState } from "react";
import ProductsPagination from "../../components/productsPagination/ProductsPagination";
import Filters from "../../components/filter/Filters";

interface FiltersParams {
    search: string;
    categories: string[];
    minPrice: number | null;
    maxPrice: number | null;
    rating: number | null;
}

const ProductsPage: FC = () => {
    const [filtersParams, setFiltersParams] = useState<FiltersParams>({
        search: "",
        categories: [],
        minPrice: null,
        maxPrice: null,
        rating: null,
    });

    const handleFilterChange = (newFilters: Partial<FiltersParams>) => {
        setFiltersParams((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

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

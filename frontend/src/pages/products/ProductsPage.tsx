import { Box } from "@mui/material";
import { FC } from "react";
import ProductsPagination from "../../components/productsPagination/ProductsPagination";
import Filters from "../../components/filter/Filters";
import { useFilters } from "../../hooks/use-filters";

export interface FilterState {
    search: string;
    categories: string[];
    priceMin: number | null;
    priceMax: number | null;
    rating: number | null;
}

const ProductsPage: FC = () => {
    const [filtersParams, handleFilterChange] = useFilters();

    return (
        <Box>
            {/* filters and search  */}
            <Box py={10}>
                <Filters onFilter={handleFilterChange} filtersParams={filtersParams} />
            </Box>

            <Box>
                <ProductsPagination filtersParams={filtersParams} />
            </Box>
        </Box>
    );
};

export default ProductsPage;

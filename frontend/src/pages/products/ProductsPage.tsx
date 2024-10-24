import { Box } from "@mui/material";
import { FC, useCallback, useState } from "react";
import ProductsPagination from "../../components/productsPagination/ProductsPagination";
import Filters from "../../components/filter/Filters";

export interface FilterState {
    search: string;
    categories: string[];
    priceMin: number | null;
    priceMax: number | null;
    rating: number | null;
}

const ProductsPage: FC = () => {
    console.log("re-rendering products");
    const [filtersParams, setFiltersParams] = useState<FilterState>({
        search: "",
        categories: [],
        priceMin: null,
        priceMax: null,
        rating: null,
    });
    console.log(filtersParams);

    const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
        setFiltersParams((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    }, []);

    return (
        <Box>
            {/* filters and search  */}
            <Box bgcolor={"#c9c4c5"} py={10}>
                <Filters onFilter={handleFilterChange} filtersParams={filtersParams} />
            </Box>

            <Box>
                <ProductsPagination filtersParams={filtersParams} />
            </Box>
        </Box>
    );
};

export default ProductsPage;

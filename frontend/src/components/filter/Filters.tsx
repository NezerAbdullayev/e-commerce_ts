import { Input, Checkbox, Rate } from "antd";
import { Box } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { FilterState } from "../../pages/products/ProductsPage";
import { debounce, DebouncedFunc } from "lodash";
import { useGetAllCategoryQuery } from "../../redux/services/categoryApi";

interface FilterFormProps {
    onFilter: (newFilters: Partial<FilterState>) => void;
    filtersParams: FilterState;
}

const FilterForm: FC<FilterFormProps> = ({ onFilter, filtersParams }) => {
    const { data: categoriesData = [] } = useGetAllCategoryQuery();
    const [search, setSearch] = useState<string>(filtersParams.search || "");
    const debounceDelay = 600;

    const options =
        categoriesData?.map((category) => ({
            label: category.name,
            value: category._id,
        })) || [];

    const debouncedOnFilterRef = useRef<DebouncedFunc<(newFilters: Partial<FilterState>) => void> | null>(null);

    useEffect(() => {
        const debouncedOnFilter = debounce((newFilters: Partial<FilterState>) => {
            onFilter(newFilters);
        }, debounceDelay);

        debouncedOnFilterRef.current = debouncedOnFilter;

        return () => {
            debouncedOnFilterRef.current?.cancel();
        };
    }, [onFilter, debounceDelay]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearch(value);
        debouncedOnFilterRef.current?.({ search: value.trim() });
    };

    const handleCategoryChange = (checkedValues: string[]) => {
        onFilter({ categories: checkedValues });
    };

    const handlePriceChange = (name: string, value: string | null) => {
        debouncedOnFilterRef.current?.({ [name]: value ? Number(value) : null });
    };

    const handleRatingChange = (value: number) => {
        onFilter({ rating: value });
    };

    return (
        <Box width={"full"} sx={{ width: 700, maxWidth: "100%", mx: "auto" }}>
            {/* Search input */}
            <Box display={"flex"} flexDirection={"column"}>
                <Box>Search:</Box>
                <Input
                    style={{ padding: "15px 10px", width: "700px" }}
                    name="search"
                    placeholder="Search products"
                    value={search}
                    onChange={handleSearchChange}
                />
            </Box>

            {/* Price  */}
            <Box sx={{ display: "flex", gap: "16px", mt: 2 }}>
                <Box>
                    <Box>Minimum price:</Box>
                    <Input type="number" placeholder="min price" onChange={(e) => handlePriceChange("priceMin", e.target.value)} />
                </Box>

                <Box>
                    <Box>Maximum price:</Box>
                    <Input type="number" placeholder="max price" onChange={(e) => handlePriceChange("priceMax", e.target.value)} />
                </Box>
            </Box>

            {/* Categories multiple filter */}
            <Box mt={2}>
                <Box mb={1}>Categories</Box>
                <Checkbox.Group options={options} onChange={handleCategoryChange} />
            </Box>

            {/* Rating filter */}
            <Box mt={1}>
                <Box mb={1}>Rating:</Box>
                <Rate onChange={handleRatingChange} />
            </Box>
        </Box>
    );
};

export default FilterForm;

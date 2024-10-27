import { Input, Checkbox, Rate, Collapse } from "antd";
import { Box } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { FilterState } from "../../pages/products/ProductsPage";
import { debounce, DebouncedFunc } from "lodash";
import { useGetAllCategoryQuery } from "../../redux/services/categoryApi";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

interface FilterFormProps {
    onFilter: (newFilters: Partial<FilterState>) => void;
    filtersParams: FilterState;
}

const FilterForm: FC<FilterFormProps> = ({ onFilter, filtersParams }) => {
    const { t } = useTranslation();
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
        if (Number(value) < 0) return;
        debouncedOnFilterRef.current?.({ [name]: value ? Number(value) : null });
    };

    const handleRatingChange = (value: number) => {
        onFilter({ rating: value });
    };

    return (
        <Box width={"full"} sx={{ width: 700, maxWidth: "100%", mx: "auto" }}>
            {/* Search input */}
            <Box display={"flex"} flexDirection={"column"}>
                <Box className="text-center text-xl text-stone-700">{t("search")}</Box>
                <Input
                    style={{ padding: "15px 10px", width: "700px" }}
                    name="search"
                    placeholder={t("searchProducts")}
                    value={search}
                    onChange={handleSearchChange}
                    prefix={<FaSearch />}
                />
            </Box>

            {/* Filters */}
            <Collapse
                className="mt-2.5 bg-white"
                items={[
                    {
                        key: "1",
                        label: t("filters"),
                        children: (
                            <Box>
                                {/* Price Filter */}
                                <Box sx={{ display: "flex", gap: "16px", mt: 2 }}>
                                    <Box>
                                        <Box>{t("minimumPrice")}:</Box>
                                        <Input
                                            type="number"
                                            placeholder={t("minPrice")}
                                            onChange={(e) => handlePriceChange("priceMin", e.target.value)}
                                        />
                                    </Box>

                                    <Box>
                                        <Box>{t("maximumPrice")}:</Box>
                                        <Input
                                            type="number"
                                            placeholder={t("maxPrice")}
                                            onChange={(e) => handlePriceChange("priceMax", e.target.value)}
                                        />
                                    </Box>
                                </Box>

                                {/* Categories multiple filter */}
                                <Box mt={2}>
                                    <Box mb={1}>{t("categories")}</Box>
                                    <Checkbox.Group options={options} onChange={handleCategoryChange} />
                                </Box>

                                {/* Rating filter */}
                                <Box mt={1}>
                                    <Box mb={1}>{t("rating")}</Box>
                                    <Rate onChange={handleRatingChange} />
                                </Box>
                            </Box>
                        ),
                    },
                ]}
            />
        </Box>
    );
};

export default FilterForm;

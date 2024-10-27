import { useCallback, useState } from "react";

export interface FilterState {
    search: string;
    categories: string[];
    priceMin: number | null;
    priceMax: number | null;
    rating: number | null;
}

export const useFilters = (): [FilterState, (newFilters: Partial<FilterState>) => void] => {
    const [filtersParams, setFiltersParams] = useState<FilterState>({
        search: "",
        categories: [],
        priceMin: null,
        priceMax: null,
        rating: null,
    });

    const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
        setFiltersParams((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    }, []);

    return [filtersParams, handleFilterChange];
};

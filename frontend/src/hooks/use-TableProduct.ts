import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../redux/services/productsApi";
import { useGetAllCategoryQuery } from "../redux/services/categoryApi";
import { filtersParams } from "../redux/services/types/products.types";

export const useProducts = (initialPage: number = 1, initialLimit: number, filtersParams?: filtersParams) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);

    const {
        data: productsData,
        error: productError,
        isLoading: productLoading,
    } = useGetAllProductsQuery({ page: currentPage, limit, filtersParams });
    const { data: AllCategories, error: categoryError, isLoading: categoryLoading } = useGetAllCategoryQuery();

    useEffect(() => {
        setCurrentPage(initialPage);
        setLimit(initialLimit);
        window.scrollTo(0, 0);
    }, [initialPage, initialLimit]);

    return {
        productsData,
        productError,
        productLoading,
        AllCategories,
        categoryLoading,
        categoryError,
        currentPage,
        setCurrentPage,
        limit,
        setLimit,
    };
};

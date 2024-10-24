import { useCallback, useState } from "react";
import { useGetAllProductsQuery } from "../redux/services/productsApi";
import { filtersParams } from "../redux/services/types/products.types";

interface UsePaginationProps {
    limit?: number;
    initialPage?: number;
    filtersParams?: filtersParams;
}

const useAllProductsPagination = ({ initialPage = 1, limit = 10, filtersParams }: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const { data, isLoading, error } = useGetAllProductsQuery({ page: currentPage, limit, filtersParams });

    const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    }, []);

    console.log(data, "data", "isLoading", isLoading);

    return {
        products: data?.products || [],
        totalPages: data?.totalPages || 0,
        currentPage,
        isLoading,
        error,
        handlePageChange,
    };
};

export default useAllProductsPagination;

import { useCallback, useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../redux/services/adminApi";

interface UsePaginationProps {
    limit?: number;
    initialPage: number;
}

const usePagination = ({ initialPage = 1, limit = 10 }: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const { data, isLoading, error } = useGetAllProductsQuery({ page: currentPage, limit });

    useEffect(() => {
        setCurrentPage(initialPage);
    }, [initialPage]);

    const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    }, []);

    return {
        products: data?.products || [],
        totalPages: data?.totalPages || 0,
        currentPage,
        isLoading,
        error,
        handlePageChange,
    };
};

export default usePagination;
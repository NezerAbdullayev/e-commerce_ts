import { useState } from "react";

const usePagination = (totalItems: number, initialPageSize: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    // const limit: number = 15;
    const pageSize = initialPageSize;

    const totalPages = Math.ceil(totalItems / pageSize);

    const paginate = (items) => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = currentPage * pageSize;
        return items.slice(startIndex, endIndex);
    };

    return {
        currentPage,
        pageSize,
        totalPages,
        paginate,
        setCurrentPage,
    };
};

export default usePagination;

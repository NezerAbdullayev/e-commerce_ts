import { FC } from "react";
import TableProducts from "./TableProducts";
import { Box } from "@mui/material";
import { useFilters } from "../../../../hooks/use-filters";
import Filters from "../../../../components/filter/Filters";

const AdminProducts: FC = () => {
    const [filtersParams, handleFilterChange] = useFilters();

    return (
        <Box>
            <Box mb={2}>
                <Filters onFilter={handleFilterChange} filtersParams={filtersParams} />
            </Box>

            <TableProducts filtersParams={filtersParams} />
        </Box>
    );
};

export default AdminProducts;

import { FC } from "react";
import { useGetAppLogoQuery } from "../../redux/services/logoApi";
import Loading from "../../components/Loading";
import Error from "../../pages/admin/components/Error";
import { Box } from "@mui/material";

const Logo: FC = () => {
    const { data, isLoading, error } = useGetAppLogoQuery();

    return (
        <Box sx={{ position: "relative" }}>
            {isLoading ? <Loading /> : error ? <Error message="Logo error" /> : data && data.length > 0 && data[0].name}
        </Box>
    );
};

export default Logo;

import { FC } from "react";
import { useGetAppLogoQuery } from "../../redux/services/logoApi";
import Loading from "../Loading";
import Error from "../../pages/admin/components/Error";

const Logo: FC = () => {
    const { data, isLoading, error } = useGetAppLogoQuery();

    const defaultLogo: string = "TrendTee";

    return <>{isLoading ? <Loading /> : error ? <Error message="Logo error" /> : data ? data.length > 0 && data[0].name : defaultLogo}</>;
};

export default Logo;

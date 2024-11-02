import { FC, useMemo } from "react";
import { Box, Pagination } from "@mui/material";
import ProductCard from "../productCard/ProductCard";
import CardContainer from "../productCard/CardContainer";
import useAllProductsPagination from "../../hooks/use-allProductsPagination";
import Loading from "../Loading";
import { useGetAllFavoritesQuery } from "../../redux/services/favoritesApi";
import { shallowEqual, useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slice/authSlice";
import Error from "../../pages/admin/components/Error";
import { useTranslation } from "react-i18next";
import { FilterState } from "../../hooks/use-filters";

export interface HandlerRes {
    name: string;
    productId: string;
    image: string;
    price: number;
}

interface ProductsPaginationProps {
    filtersParams: FilterState;
}

const ProductsPagination: FC<ProductsPaginationProps> = ({ filtersParams }) => {
    const isAuth = useSelector(isAuthenticated, shallowEqual);
    const { t } = useTranslation();

    console.log("retrwdwer");

    const { products, totalPages, currentPage, isLoading, error, handlePageChange } = useAllProductsPagination({
        initialPage: 1,
        limit: 20,
        filtersParams,
    });

    const { data: favoritesData } = useGetAllFavoritesQuery(undefined, { skip: !isAuth });

    const productsWithFavoriteInfo = useMemo(() => {
        return products.map((product) => {
            const favorite = favoritesData?.find((fav) => fav.productId === product._id);
            return {
                ...product,
                isFavorited: Boolean(favorite),
                favId: favorite && favorite._id,
            };
        });
    }, [products, favoritesData]);

    return (
        <Box className="my-10">
            <CardContainer>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <Error message={t("error_fetching_products")} />
                ) : products?.length > 0 ? (
                    <>
                        {productsWithFavoriteInfo.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                image={product.image[0]}
                                price={product.price}
                                rating={product.rating}
                                isFavorited={product.isFavorited}
                                favId={product.favId}
                            />
                        ))}
                        <Box display="flex" justifyContent="center" mt={3} width={"100%"}>
                            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                        </Box>
                    </>
                ) : (
                    <Error message={t("no_products_found")} />
                )}
            </CardContainer>
        </Box>
    );
};

export default ProductsPagination;

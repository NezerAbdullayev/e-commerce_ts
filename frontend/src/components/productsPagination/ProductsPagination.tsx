import { FC, useCallback, useMemo } from "react";
import { Box, Pagination } from "@mui/material";
import ProductCard from "../productCard/ProductCard";
import CardContainer from "../productCard/CardContainer";
import useAllProductsPagination from "../../hooks/use-allProductsPagination";
import Loading from "../Loading";
import { useAddtoFavoritesMutation, useGetAllFavoritesQuery } from "../../redux/services/favoritesApi";
import { useAddToCartMutation } from "../../redux/services/cartApi";
import { toast } from "react-toastify";
import { shallowEqual, useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slice/authSlice";
import Error from "../../pages/admin/components/Error";
import { filtersParams } from "../../redux/services/types/products.types";
import { useTranslation } from "react-i18next";

export interface HandlerRes {
    name: string;
    productId: string;
    image: string;
    price: number;
}

interface ProductsPaginationProps {
    filtersParams: filtersParams;
}

const ProductsPagination: FC<ProductsPaginationProps> = ({ filtersParams }) => {
    const isAuth = useSelector(isAuthenticated, shallowEqual);
    const { t } = useTranslation();

    const { products, totalPages, currentPage, isLoading, error, handlePageChange } = useAllProductsPagination({
        initialPage: 1,
        limit: 20,
        filtersParams,
    });

    const { data: favoritesData } = useGetAllFavoritesQuery(undefined, { skip: !isAuth });
    const [addToCart] = useAddToCartMutation();
    const [addToFavorite] = useAddtoFavoritesMutation();

    const favoriteIds = useMemo(() => {
        return favoritesData ? favoritesData.map((fav) => fav.productId) : [];
    }, [favoritesData]);

    const onAddToFavorites = useCallback(
        async ({ name, productId, image, price }: HandlerRes) => {
            if (!isAuth) {
                toast.error(t("please_log_in"));
                return;
            }
            try {
                await addToFavorite({ name, productId, image, price });
                toast.success(t("product_added_to_favorites"));
            } catch (error) {
                console.error(error);
                toast.error(t("failed_to_add_favorite"));
            }
        },
        [addToFavorite, isAuth, t],
    );

    const onAddToBasket = useCallback(
        async ({ name, productId, image, price }: HandlerRes) => {
            if (!isAuth) {
                toast.error(t("please_log_in"));
                return;
            }
            try {
                await addToCart({ name, productId, image, price });
                toast.success(t("product_added_to_basket"));
            } catch (error) {
                toast.error(t("failed_to_add_basket"));
                console.error(error);
            }
        },
        [addToCart, isAuth, t],
    );

    return (
        <Box className="my-10">
            <CardContainer>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <Error message={t("error_fetching_products")} />
                ) : products?.length > 0 ? (
                    <>
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                image={product.image[0]}
                                price={product.price}
                                rating={product.rating}
                                onAddToFavorites={onAddToFavorites}
                                onAddToBasket={onAddToBasket}
                                isFavorited={favoriteIds.includes(product._id)}
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

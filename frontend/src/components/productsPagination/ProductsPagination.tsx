import { FC, useCallback, useMemo } from "react";
import { Alert, Box, Pagination } from "@mui/material";
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
    console.log(filtersParams);
    const isAuth = useSelector(isAuthenticated, shallowEqual);

    const { products, totalPages, currentPage, isLoading, error, handlePageChange } = useAllProductsPagination({
        initialPage: 1,
        limit: 20,
        filtersParams,
    });

    console.log(isLoading);
    const { data: favoritesData } = useGetAllFavoritesQuery(undefined, { skip: !isAuth });
    const [addToCart] = useAddToCartMutation();
    const [addToFavorite] = useAddtoFavoritesMutation();

    const favoriteIds = useMemo(() => {
        return favoritesData ? favoritesData.map((fav) => fav.productId) : [];
    }, [favoritesData]);

    const onAddToFavorites = useCallback(
        async ({ name, productId, image, price }: HandlerRes) => {
            if (!isAuth) {
                toast.error("Please log in to your account or create a new one.");
                return;
            }
            try {
                await addToFavorite({ name, productId, image, price });
                toast.success("Product added to the favorite successfully!");
            } catch (error) {
                console.error(error);
                toast.error("Failed to add the product to the favorite. Please try again.");
            }
        },
        [addToFavorite, isAuth],
    );

    const onAddToBasket = useCallback(
        async ({ name, productId, image, price }: HandlerRes) => {
            if (!isAuth) {
                toast.error("Please log in to your account or create a new one.");
                return;
            }
            try {
                await addToCart({ name, productId, image, price });
                toast.success("Product added to the basket successfully!");
            } catch (error) {
                toast.error("Failed to add the product to the basket. Please try again.");
                console.error(error);
            }
        },
        [addToCart, isAuth],
    );

    return (
        <Box className="my-10">
            <CardContainer>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <Error message="An error occurred while fetching the products data." />
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
                    <Box display="flex" justifyContent="center" alignItems={"center"} p={2}>
                        <Alert severity="info">No products found.</Alert>
                    </Box>
                )}
            </CardContainer>
        </Box>
    );
};

export default ProductsPagination;

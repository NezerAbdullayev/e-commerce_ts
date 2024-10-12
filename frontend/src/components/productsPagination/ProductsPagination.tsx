import { FC, useMemo } from "react";
import { Alert, Box, Pagination } from "@mui/material";
import ProductCard from "../productCard/ProductCard";
import CardContainer from "../productCard/CardContainer";
import useAllProductsPagination from "../../hooks/use-allProductsPagination";
import Loading from "../Loading";
import { useGetAllFavoritesQuery } from "../../redux/services/favoritesApi";

const ProductsPagination: FC = () => {
    const { products, totalPages, currentPage, isLoading, error, handlePageChange } = useAllProductsPagination({
        initialPage: 1,
        limit: 12,
    });
    const { data: favoritesData } = useGetAllFavoritesQuery();

    const favoriteIds = useMemo(() => (favoritesData && favoritesData?.map((fav) => fav.productId)) || [], [favoritesData]);

    return (
        <Box className="my-10">
            <CardContainer>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <Box display="flex" justifyContent="center" alignItems={"center"} p={2} minHeight={"100vh"}>
                        <Alert severity="error">An error occurred while fetching the products data.</Alert>
                    </Box>
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
                                isFavorited={favoriteIds ? favoriteIds.includes(product._id) : false}
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

import { FC, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/services/productsApi";
import { Box, Pagination } from "@mui/material";
import ProductCard from "../card/ProductCard";
import CardContainer from "../card/CardContainer";

const ProductsPagination: FC = () => {
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, error } = useGetAllProductsQuery({ page, limit: 15 });

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    console.log(data?.products);

    return (
        <Box className="my-10">
            <CardContainer>
                {data && (
                    <>
                        {isLoading && <p>Loading...</p>}
                        {error && <p>Error loading products</p>}

                        {data.products.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                image={product.image[0]}
                                price={product.price}
                                rating={product.rating}
                            />
                        ))}

                        <Pagination count={data.totalPages} page={page} onChange={handlePageChange} color="primary" />
                    </>
                )}
            </CardContainer>
        </Box>
    );
};

export default ProductsPagination;

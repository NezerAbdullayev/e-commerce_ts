import { Box, Typography } from "@mui/material";
import { FC } from "react";
import CardContainer from "../card/CardContainer";
import ProductCard from "../card/ProductCard";
import { Products } from "../../types/globalTypes";

interface ProductsGroupProps {
    catgoryTitle: string;
    productData: Products[] | [];
}

const ProductsGroup: FC<ProductsGroupProps> = ({ catgoryTitle, productData }) => {
    console.log();
    return (
        <Box>
            {productData?.length > 0 ? (
                <>
                    <Typography
                        variant="h2"
                        component="h2"
                        align="center"
                        color="textSecondary"
                        sx={{ mb: 2.5, fontFamily: "gutterBottom" }}
                    >
                        {catgoryTitle}
                    </Typography>
                    <CardContainer>
                        {productData?.length > 0 &&
                            productData.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    image={product.image[0]}
                                />
                            ))}
                    </CardContainer>
                </>
            ) : (
                ""
            )}
        </Box>
    );
}; // id, name, image, price, raiting

export default ProductsGroup;
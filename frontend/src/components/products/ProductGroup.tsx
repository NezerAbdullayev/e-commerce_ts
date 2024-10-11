import { Box, Typography } from "@mui/material";
import { FC, memo } from "react";
import CardContainer from "../productCard/CardContainer";
import ProductCard from "../productCard/ProductCard";
import { Products } from "../../types/globalTypes";

interface ProductsGroupProps {
    catgoryTitle: string;
    productData: Products[] | [];
    favoriteIds: string[];
}

const ProductsGroup: FC<ProductsGroupProps> = ({ catgoryTitle, productData, favoriteIds }) => {
    return (
        <Box marginY={10}>
            {productData?.length > 0 && (
                <>
                    {/* title */}
                    <Typography
                        variant="h2"
                        component="h2"
                        align="center"
                        color="textSecondary"
                        sx={{ mb: 2.5, fontFamily: "gutterBottom" }}
                    >
                        {catgoryTitle}
                    </Typography>

                    {/* content */}
                    <CardContainer>
                        {productData.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                image={product.image[0]}
                                isFavorited={favoriteIds ? favoriteIds.includes(product._id) : false}
                            />
                        ))}
                    </CardContainer>
                </>
            )}
        </Box>
    );
};

export default memo(ProductsGroup);

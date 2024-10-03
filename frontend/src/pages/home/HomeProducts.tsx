import { FC } from "react";
import ProductsGroup from "../../components/products/ProductGroup";
import { useGetProductsByCategoryQuery } from "../../redux/services/productsApi";

const HomeProducts: FC = () => {
    // categories, page, limit
    const { data: tShirtProductData } = useGetProductsByCategoryQuery({ categories: "T-shirt", limit: 20 });

    // const { data: oversizedProductData } = useGetProductsByCategoryQuery({ categories: "overSized", limit: 20 });

    // const { data: hoodieProductData } = useGetProductsByCategoryQuery({ categories: "Hoodie", limit: 20 });

    console.log(tShirtProductData?.products);

    return (
        <div>
            <ProductsGroup catgoryTitle={"T-shirt"} productData={tShirtProductData?.products || []} />

            {/* <ProductsGroup catgoryTitle={"Oversized"} productData={oversizedProductData || []} />

            <ProductsGroup catgoryTitle={"Hoodie"} productData={hoodieProductData || []} /> */}
        </div>
    );
};

export default HomeProducts;

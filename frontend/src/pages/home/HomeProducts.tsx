import { FC, useMemo } from "react";
import ProductsGroup from "../../components/products/ProductGroup";
import { useGetProductsByCategoryQuery } from "../../redux/services/productsApi";
import { useGetAllFavoritesQuery } from "../../redux/services/favoritesApi";
import Loading from "../../components/Loading";

const HomeProducts: FC = () => {
    const { data: favortiesData } = useGetAllFavoritesQuery();

    // categories, page, limit
    const {
        data: tShirtProductData,
        error,
        isLoading: tShirtLoading,
    } = useGetProductsByCategoryQuery({ categories: "T-shirt", limit: 12 });

    const { data: oversizedProductData } = useGetProductsByCategoryQuery({ categories: "OverSized", limit: 20 });

    const { data: hoodieProductData } = useGetProductsByCategoryQuery({ categories: "Hoodie", limit: 12 });

    console.log(error);

    const favoriteIds = useMemo(() => favortiesData?.map((fav) => fav.productId) || [], [favortiesData]);

    console.log("re-rendering HomeProducts");

    return (
        <div>
            {tShirtLoading ? (
                <Loading />
            ) : (
                <ProductsGroup catgoryTitle={"T-shirt"} productData={tShirtProductData?.products} favoriteIds={favoriteIds} />
            )}

            <ProductsGroup catgoryTitle={"Oversized"} productData={oversizedProductData?.products || []} favoriteIds={favoriteIds} />

            <ProductsGroup catgoryTitle={"Hoodie"} productData={hoodieProductData?.products || []} favoriteIds={favoriteIds} />
        </div>
    );
};

export default HomeProducts;

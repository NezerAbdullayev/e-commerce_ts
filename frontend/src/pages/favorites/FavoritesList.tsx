import FavoriteItem from "./FavoriteItem";



const FavoritesList = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <FavoriteItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default FavoritesList;

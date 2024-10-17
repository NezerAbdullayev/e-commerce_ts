export interface Favorites {
    name: string;
    image: string;
    price: number;
}
export interface FavoritesProps extends Favorites {
    id: string;
    productId: string;
}

export interface FavoritesResponse extends Favorites {
    _id: string;
    productId: string;
}

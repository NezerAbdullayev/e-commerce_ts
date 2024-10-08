export interface Login {
    email: string;
    password: string;
}
export interface Signup extends Login {
    name: string;
}

export interface Auth extends Login {
    name?: string;
}

export interface Options {
    value: string;
    label: string;
}

export interface FileObject {
    uid: string;
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    originFileObj: File;
}

export interface Products {
    _id: string;
    name: string;
    brand: string;
    rating: number;
    isFeatured: string;
    description: string;
    category: string[];
    image: string[];
    price: number;
    stock: number;
    reviews: string[];
}
//cart

export interface CartProps {
    name: string;
    productId: string;
    image: string;
    price: number;
}
export interface CartData extends CartProps {
    _id: string;
    quantity: number;
}

// favorites

// image: "https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727795428/products/ti1hiuy4ti7eux9kutzz.webp";
// name: "T-shirt C1";
// price: 43.9;
// productId: "66fc10e60687e21c860102d0";
// _id: "670544cb00099894893a44fa";

export interface Favorites {
    name: string;
    productId: string;
    image: string;
    price: number;
}
export interface FavoritesProps extends Favorites {
    id: string;
}

export interface FavoritesResponse extends Favorites {
    _id: string;
}

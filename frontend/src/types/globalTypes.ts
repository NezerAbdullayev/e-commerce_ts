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

// category
export interface CategoryResponse {
    name: string;
    _id: string;
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

// users

export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface UserResponse {
    users: User[];
    currentPage: number;
    totalPages: number;
    totalUsers: number;
}

export interface SearchParams {
    searchTerm: string;
}

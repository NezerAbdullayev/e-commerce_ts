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

// products
export interface Products {
    _id: string;
    name: string;
    brand: string;
    rating: number;
    isFeatured: string;
    description: string;
    category: CategoryResponse[];
    image: string[];
    price: number;
    stock: number;
    reviews: string[];
}

export interface ProductsResponse {
    currentPage: number;
    products: Products[];
    totalPages: number;
    totalProducts: number;
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

// refactor

// interface FormInputProps<T extends FieldValues> {
//     name: Path<T>;
//     control: Control<T>;
//     defaultValue?: PathValue<T, Path<T>>;
//     error?: string;
//     type?: string;
//     icon?: ReactNode;
// }

// interface FormSelectProps<T extends FieldValues> {
//     name: Path<T>;
//     control: Control<T>;
//     options: CategoryResponse[];
//     multiple?: boolean;
//     error?: string;
//     defaultValue?: PathValue<T, Path<T>>;
// }

// interface FormTextareaProps<T extends FieldValues> {
//     name: Path<T>;
//     control: Control<T>;
//     defaultValue?: PathValue<T, Path<T>>;
//     error?: string;
// }

// interface FormInputProps<T extends FieldValues> {
//     name: Path<T>;
//     control: Control<T>;
//     error?: string;
//     defaultValue?: PathValue<T, Path<T>>;
// }

// interface FormInputProps<T extends FieldValues> {
//     name: Path<T>;
//     control: Control<T>;
//     defaultValue?: PathValue<T, Path<T>>;
//     error?: string;
// }

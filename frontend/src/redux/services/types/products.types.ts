import { CategoryResponse } from "../../../types/globalTypes";

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

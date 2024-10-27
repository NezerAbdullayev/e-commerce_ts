import { CategoryResponse } from "../../../globalTypes/globalTypes";

export interface ReviewProps {
    _id: string;
    comment: string;
    createdAt: string;
    name: string;
    rating: number;
    updatedAt: string;
    user: string;
}
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
    numReview?: number;
    reviews: ReviewProps[];
}

export interface ProductsResponse {
    currentPage: number;
    products: Products[];
    totalPages: number;
    totalProducts: number;
}

export interface filtersParams {
    categories: string[] | [];
    priceMax: number | null;
    priceMin: number | null;
    rating: number | null;
    search?: string;
}
export interface ProductsReq {
    page?: number;
    limit?: number;
    filtersParams?: filtersParams;
}

import { Products } from "./products.types";

export interface CreateOrders {
    productId: string;
    quantity: number;
    price: number;
}

export interface CreateOrderFN extends CreateOrders {
    id: string;
}

export interface ProductsRef {
    product: Products;
    quantity: number;
    price: number;
}

export interface OrdersResponse {
    createdAt: string;
    status: string;
    totalAmount: number;
    product: ProductsRef;
    _id: string;
}

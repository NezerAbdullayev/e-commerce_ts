export interface CreateOrders {
    productId: string;
    quantity: number;
    price: number;
}

export interface CreateOrderFN extends CreateOrders {
    id: string;
}

export interface CartProps {
    name: string;
    productId: string;
    image: string;
    price: number;
    quantity?: number;
}
export interface CartData extends CartProps {
    _id: string;
    quantity: number;
}

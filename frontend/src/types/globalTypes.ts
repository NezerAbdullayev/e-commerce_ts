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
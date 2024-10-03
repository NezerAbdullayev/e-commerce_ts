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

export interface FormItem {
    label: string;
    type: string;
    options?: Array<{ value: string; label: string }>;
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
    rating: string;
    isFeatured: string;
    description: string;
    category: string[];
    image: string[];
    price: number;
    stock: number;
    reviews: string[];
}

// brand: "Zara"
// category: ["T-shirt"]
// createdAt: "2024-10-01T15:10:30.868Z"
// description: "lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun lorem-imsun"
// image: ["https://res.cloudinary.com/dyrqjvw6d/image/upload/v1727795428/products/ti1hiuy4ti7eux9kutzz.webp",…]
// isFeatured: false
// name: "T-shirt C1"
// price: 43.9
// rating: 0
// reviews: []
// stock: 10
// updatedAt: "2024-10-01T15:10:30.868Z"
// __v: 0
// _id: "66fc10e60687e21c860102d0"

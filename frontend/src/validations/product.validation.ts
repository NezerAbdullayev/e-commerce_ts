import { mixed, number, object, string } from "yup";

// create product schema
export const createProductSchema = object().shape({
    name: string().required("Name is required").min(3, "Invalid name format"),
    image: mixed().required("Image is required"),
    price: number().required("Price is required").positive("Price must be a positive number").min(0.01, "Price must be at least 0.01"),
    category: string().required("Category is required").min(3, "Invalid category format"),
    stock: number().required("Stock is required").positive("Stock must be a positive number").min(1, "Stock must be at least 1"),
    brand: string(),
    description: string().required("Description is required"),
});

import { mixed, number, object, string } from "yup";

// create product schema
export const createProductSchema = object().shape({
    name: string().required("Name is required").min(3, "Invalid name format"),
    image: mixed()
        .required("Image is required")
        .test("fileFormat", "Unsupported Format", (value: any) => {
            // Fayl varsa, tipini yoxlayır
            return !value || (value && (value.type === "image/jpeg" || value.type === "image/png"));
        }),
    price: number().required("Price is required").positive("Price must be a positive number").min(0.01, "Price must be at least 0.01"),
    category: string().required("Category is required").min(3, "Invalid category format"),
    description: string().required("Description is required"),
});

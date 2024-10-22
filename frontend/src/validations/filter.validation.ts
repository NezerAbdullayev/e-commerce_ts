import { array, number, object, ref, string } from "yup";

export const validationSchema = object().shape({
    search: string(),
    rating: number().min(0).max(5, "Rating must be between 0 and 5"),
    minPrice: number()
        .min(0, "Minimum price must be at least 0")
        .max(ref("maxPrice"), "Minimum price cannot be greater than maximum price"),
    maxPrice: number().min(ref("minPrice"), "Maximum price cannot be less than minimum price").max(1000, "Maximum price cannot exceed 100"),
    category: array(),
});

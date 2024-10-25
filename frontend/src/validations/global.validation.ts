import { object, string } from "yup";

// logo
export const logoSchema = object().shape({
    name: string().required("Logo is required").min(3, "Logo name must be at least 3 characters long"),
});

// review
export const reviewSchema = object().shape({
    comment: string().required("Message is required"),
});

import { object, string } from "yup";

export const reviewSchema = object().shape({
    comment: string().required("Message is required"),
});

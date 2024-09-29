import { object, string } from "yup";

export const loginSchema = object().shape({
    email: string().required("Email is required").email("Invalid email format"),
    password: string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export const signupSchema = object().shape({
    name: string().required("Name is required").min(3, "Minimum 3 characters"),
    email: string().required("Email is required").email("Invalid email"),
    password: string().required("Password is required").min(6, "Minimum 6 characters"),
});

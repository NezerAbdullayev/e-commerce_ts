import { object, string } from "yup";
import { TFunction } from "i18next";

export const getLoginSchema = (t: TFunction) => {
    return object().shape({
        email: string().required(t("email_required")).email(t("invalid_email_format")),
        password: string().required(t("password_required")).min(6, t("min_password")),
    });
};

export const getSignupSchema = (t: TFunction) => {
    return object().shape({
        name: string().required(t("Name is required")).min(3, t("Minimum 3 characters")),
        email: string().required(t("email_required")).email(t("invalid_email_format")),
        password: string().required(t("password_required")).min(6, t("min_password")),
    });
};

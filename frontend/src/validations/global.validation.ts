import { object, string } from "yup";
import { TFunction } from "i18next";

// logo schema
export const getLogoSchema = (t: TFunction) => {
    return object().shape({
        name: string().required(t("logo_required")).min(3, t("min_logo")),
    });
};

// review schema
export const getReviewSchema = (t: TFunction) => {
    return object().shape({
        comment: string().required(t("review_message_required")),
    });
};

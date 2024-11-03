import { array, mixed, number, object, string } from "yup";

export const createProductSchema = (t: (key: string) => string) => {
    return object().shape({
        name: string().required(t("name_is_required")).min(3, t("min_name_chareacter")),
        image: mixed().required(t("img_required")),
        price: number().required(t("price_required")).positive(t("positive_numbers")).min(0.01, t("min_price")),
        category: array()
            .of(string().min(3, t("category_format")))
            .required(t("category_required"))
            .min(1, t("min_sellected_category")),
        stock: number().required(t("stock_required")).positive(t("positive_stock")).min(1, t("min_stock")),
        brand: string(),
        description: string().required(t("required_desc")),
    });
};

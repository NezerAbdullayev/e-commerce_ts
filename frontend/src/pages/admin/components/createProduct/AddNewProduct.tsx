import { FC, useCallback } from "react";
import { createProductSchema } from "../../../../validations/product.validation";
import { FileObject } from "../../../../globalTypes/globalTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { convertImagesToBase64 } from "../../../../utils/convertImagesToBase64";
import FormInput from "../../../../components/Forms/FormInput";
import FormTextarea from "../../../../components/Forms/FormTextarea";
import FormSelect from "../../../../components/Forms/FormSellect";
import FormInputFile from "../../../../components/Forms/FormInputFile";
import { Box } from "@mui/material";
import { useGetAllCategoryQuery } from "../../../../redux/services/categoryApi";
import { useCreateNewProductMutation } from "../../../../redux/services/productsApi";
import PageTitle from "../../../../components/PageTitle";
import Loading from "../../../../components/Loading";
import Error from "../Error";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface NewProduct {
    brand?: string;
    category: string[];
    description: string;
    image: FileObject[];
    name: string;
    price: number;
    stock: number;
}

const AddNewProduct: FC = () => {
    const { t } = useTranslation();
    const [createNewProduct, { isLoading: createLoading }] = useCreateNewProductMutation();
    const { data: categoriesData, isLoading: CategiresLoading, error: categoriesError } = useGetAllCategoryQuery();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewProduct>({ resolver: yupResolver(createProductSchema) });

    const onSubmit: SubmitHandler<NewProduct> = useCallback(
        async (data) => {
            try {
                const base64Images = await convertImagesToBase64(data.image);
                const newProduct = {
                    ...data,
                    image: base64Images,
                };
                await createNewProduct({ newProduct });
                toast.success(t("productCreatedSuccess"));
                reset({
                    image: [],
                });
            } catch (error) {
                console.error(error);
                toast.error(t("productCreationFailed"));
            }
        },
        [createNewProduct, reset, t],
    );

    return (
        <Box>
            <PageTitle>{t("addNewProduct")}</PageTitle>
            <Box className="mx-auto max-w-[600px] rounded-xl border-2 bg-[#e1daed] px-10 py-5">
                <Form onFinish={handleSubmit(onSubmit)} className="w-full">
                    <FormInput<NewProduct> error={errors.name?.message} name="name" control={control} />
                    <Box display="grid" gridTemplateColumns={"1fr 1fr"} mb={2} gap={2}>
                        <FormInput<NewProduct> error={errors.price?.message} name="price" type="number" control={control} />
                        <FormInput<NewProduct> error={errors.stock?.message} name="stock" type="number" control={control} />
                    </Box>
                    <Box display="grid" gridTemplateColumns={"1fr 1fr"} mb={2} gap={2}>
                        <FormInput<NewProduct> error={errors.brand?.message} name="brand" control={control} />
                        <Box className="relative max-h-[100px]">
                            {CategiresLoading ? (
                                <Loading />
                            ) : categoriesError ? (
                                <Error message={t("categoryNotFound")} />
                            ) : (
                                categoriesData && (
                                    <FormSelect<NewProduct>
                                        error={errors.category?.message}
                                        name="category"
                                        control={control}
                                        options={categoriesData || []}
                                        multiple={true}
                                    />
                                )
                            )}
                        </Box>
                    </Box>
                    <FormTextarea<NewProduct> error={errors.description?.message} name="description" control={control} />
                    <FormInputFile<NewProduct> error={errors.image?.message} name="image" control={control} />

                    <Button htmlType="submit" disabled={createLoading} className="mt-4 w-full py-5" type="primary">
                        {t("createProduct")}
                    </Button>
                </Form>
            </Box>
        </Box>
    );
};

export default AddNewProduct;

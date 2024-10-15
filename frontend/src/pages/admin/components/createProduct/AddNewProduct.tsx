import { FC } from "react";
import { createProductSchema } from "../../../../validations/product.validation";
import { FileObject } from "../../../../types/globalTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { formItemLayout } from "../../../../utils/formLayoutsize";
import { convertImagesToBase64 } from "../../../../utils/convertImagesToBase64";
import FormInput from "../../../../components/Forms/FormInput";
import FormTextarea from "../../../../components/Forms/FormTextarea";
import FormSelect from "../../../../components/Forms/FormSellect";
import FormInputFile from "../../../../components/Forms/FormInputFile";
import { Box } from "@mui/material";
import { useGetAllCategoryQuery } from "../../../../redux/services/categoryApi";
import { useCreateNewProductMutation } from "../../../../redux/services/productsApi";

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
    const [createNewProduct, { error: createProductError, isLoading: createLoading }] = useCreateNewProductMutation();
    const { data: categoriesData, isLoading: CategiresLoading, error: categoriesError } = useGetAllCategoryQuery();

    console.log(categoriesData);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewProduct>({ resolver: yupResolver(createProductSchema) });

    const onSubmit: SubmitHandler<NewProduct> = async (data) => {
        try {
            const base64Images = await convertImagesToBase64(data.image);
            const newProduct = {
                ...data,
                image: base64Images,
            };
            createNewProduct({ newProduct });
            console.log(newProduct);
        } catch (error) {
            console.error("Error converting images to base64:", error);
        }

        reset();
    };

    if (createLoading) {
        console.log(createLoading);
        // return (
        //     <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
        //         <Spin tip="Loading..." size="large" />
        //     </div>
        // );
    }

    return (
        <Box className="max-w-[600px]">
            <Form onFinish={handleSubmit(onSubmit)} {...formItemLayout} className="w-full">
                <FormInput<NewProduct> error={errors.name?.message} name="name" control={control} />
                <Box display={"flex"}>
                    <FormInput<NewProduct> error={errors.price?.message} name="price" type="number" control={control} />
                    <FormInput<NewProduct> error={errors.stock?.message} name="stock" type="number" control={control} />
                </Box>
                <FormInput<NewProduct> error={errors.brand?.message} name="brand" control={control} />
                <FormTextarea<NewProduct> error={errors.description?.message} name="description" control={control} />
                <FormInputFile<NewProduct> error={errors.image?.message} name="image" control={control} />
                <FormSelect<NewProduct>
                    error={errors.category?.message}
                    name="category"
                    control={control}
                    options={categoriesData || []}
                    multiple={true}
                />

                <Button htmlType="submit">Submit</Button>
            </Form>
        </Box>
    );
};

export default AddNewProduct;

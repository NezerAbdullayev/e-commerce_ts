import { FC } from "react";
import { useCreateNewProductMutation } from "../../../../redux/services/adminApi";
import { createProductSchema } from "../../../../validations/product.validation";
import { FileObject, FormItem } from "../../../../types/globalTypes";
import AccountInput from "../../../../components/AntFormItem";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "antd";
import { formItemLayout } from "../../../../utils/formLayoutsize";
import { convertImagesToBase64 } from "../../../../utils/convertImagesToBase64";

const productFormArr: FormItem[] = [
    { label: "name", type: "text" },
    { label: "price", type: "number" },
    { label: "stock", type: "number" },
    { label: "brand", type: "text" },
    {
        label: "category",
        type: "select",
        multiple: true,
        options: [
            { value: "OverSized", label: "OverSized" },
            { value: "T-shirt", label: "T-Shirt" },
            { value: "Long-sleeve", label: "Long-sleeve" },
            { value: "Basic Tees", label: "Basic Tees" },
            { value: "Hoodie", label: "Hoodie" },
        ],
    },
    { label: "image", type: "file" },
    { label: "description", type: "textarea" },
];

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
    const [createNewProduct, { data: createdData, error: createProductError, isLoading }] = useCreateNewProductMutation();
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
        } catch (error) {
            console.error("Error converting images to base64:", error);
        }

        reset();
    };

    if (isLoading) {
        console.log(isLoading);
        // return (
        //     <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
        //         <Spin tip="Loading..." size="large" />
        //     </div>
        // );
    }

    console.log(createProductError, "createProductError", createdData, "data");

    return (
        <Form onFinish={handleSubmit(onSubmit)} {...formItemLayout}>
            <AccountInput formArr={productFormArr} control={control} errors={errors} />
            <button type="submit">create product</button>
        </Form>
    );
};

export default AddNewProduct;

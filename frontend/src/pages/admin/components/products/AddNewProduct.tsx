import { FC } from "react";
import { useCreateNewProductMutation } from "../../../../redux/services/adminApi";
import { createProductSchema } from "../../../../validations/product.validation";
import { FileObject, Options } from "../../../../types/globalTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { formItemLayout } from "../../../../utils/formLayoutsize";
import { convertImagesToBase64 } from "../../../../utils/convertImagesToBase64";
import FormInput from "../../../../components/Forms/FormInput";
import FormTextarea from "../../../../components/Forms/FormTextarea";
import FormSelect from "../../../../components/Forms/FormSellect";
import FormInputFile from "../../../../components/Forms/FormInputFile";

// const productFormArr: FormItem[] = [
//     { label: "name", type: "text" },
//     { label: "price", type: "number" },
//     { label: "stock", type: "number" },
//     { label: "brand", type: "text" },
//     {
//         label: "category",
//         type: "select",
//         multiple: true,
//         options: [
//             { value: "OverSized", label: "OverSized" },
//             { value: "T-shirt", label: "T-Shirt" },
//             { value: "Long-sleeve", label: "Long-sleeve" },
//             { value: "Basic Tees", label: "Basic Tees" },
//             { value: "Hoodie", label: "Hoodie" },
//         ],
//     },
//     { label: "image", type: "file" },
//     { label: "description", type: "textarea" },
// ];

const options: Options[] = [
    { value: "OverSized", label: "OverSized" },
    { value: "T-shirt", label: "T-Shirt" },
    { value: "Long-sleeve", label: "Long-sleeve" },
    { value: "Basic Tees", label: "Basic Tees" },
    { value: "Hoodie", label: "Hoodie" },
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
            // createNewProduct({ newProduct });
            console.log(newProduct);
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
            <FormInput<NewProduct> errors={errors} name="name" control={control} />
            <FormInput<NewProduct> errors={errors} name="price" type="number" control={control} />
            <FormInput<NewProduct> errors={errors} name="stock" type="number" control={control} />
            <FormInput<NewProduct> errors={errors} name="brand" control={control} />
            <FormTextarea<NewProduct> errors={errors} name="description" control={control} />
            <FormInputFile<NewProduct> errors={errors} name="image" control={control} />
            <FormSelect<NewProduct> errors={errors} name="category" control={control} options={options} multiple={true} />

            <Button htmlType="submit">Submit</Button>
        </Form>
    );
};

export default AddNewProduct;

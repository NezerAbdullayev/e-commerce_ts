import { Button, Form } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";

import { FileObject } from "../../../../types/globalTypes";
import { createProductSchema } from "../../../../validations/product.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../../../../components/Forms/FormInput";
import FormInputFile from "../../../../components/Forms/FormInputFile";
import FormTextarea from "../../../../components/Forms/FormTextarea";
import FormSelect from "../../../../components/Forms/FormSellect";
import { formItemLayout } from "../../../../utils/formLayoutsize";

export interface NewProduct {
    brand?: string;
    category: string[];
    description: string;
    image: FileObject[];
    name: string;
    price: number;
    stock: number;
}

export default function DataTable() {
    const options = [
        { value: "OverSized", label: "OverSized" },
        { value: "T-shirt", label: "T-Shirt" },
        { value: "Long-sleeve", label: "Long-sleeve" },
        { value: "Basic Tees", label: "Basic Tees" },
        { value: "Hoodie", label: "Hoodie" },
    ];

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewProduct>({ resolver: yupResolver(createProductSchema) });

    const onSubmit: SubmitHandler<NewProduct> = async (data) => {
        console.log(data);

        reset();
    };

    return (
        <Form onFinish={handleSubmit(onSubmit)} className="mx-auto max-w-[1000px]" {...formItemLayout}>
            <FormInput<NewProduct> errors={errors} name="name" control={control} />
            <FormInput<NewProduct> errors={errors} name="price" type="number" control={control} />
            <FormInput<NewProduct> errors={errors} name="stock" type="number" control={control} />
            <FormInput<NewProduct> errors={errors} name="brand" control={control} />
            <FormTextarea errors={errors} name="description" control={control} />
            <FormSelect errors={errors} name="category" control={control} options={options} multiple={true} />
            <FormInputFile<NewProduct> errors={errors} name="image" control={control} />

            <Button htmlType="submit">Submit</Button>
        </Form>
    );
}

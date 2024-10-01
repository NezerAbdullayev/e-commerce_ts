import { FC } from "react";
import { useCreateNewProductMutation } from "../../../../redux/services/adminApi";
import { createProductSchema } from "../../../../validations/product.validation";
import { FormItem } from "../../../../types/globalTypes";
import AccountInput from "../../../../components/AccountInput";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "antd";
import { formItemLayout } from "../../../../utils/formLayoutsize";

const productFormArr: FormItem[] = [
    { label: "name", type: "text" },
    { label: "image", type: "file" },
    { label: "price", type: "number" },
    { label: "description", type: "text" },
    {
        label: "category",
        type: "select",
        options: [
            { value: "electronics", label: "Electronics" },
            { value: "furniture", label: "Furniture" },
        ],
    },
];

const AddNewProduct: FC = () => {
    const [createNewProduct, { data: createdData, error, isLoading }] = useCreateNewProductMutation();
    const userRole = useSelector((state: RootState) => state.user.role);

    console.log(userRole, "role");
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(createProductSchema) });

    const onSubmit = (data) => {
        console.log(data);
        const file = data.image; 
        const reader = new FileReader(); 

        reader.onloadend = () => {
            const base64String = reader.result;

            const newProduct = {
                ...data,
                image: base64String, 
            };

            console.log(newProduct);

            // createNewProduct funksiyasına məlumatları göndər
            createNewProduct({newProduct});  // POST sorğusu ilə məlumatları göndər
        };

        reader.readAsDataURL(file);
        console.log(data);

        // createNewProduct({ newProduct: data });
    };

    if (isLoading) {
        console.log(isLoading);
        // return (
        //     <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
        //         <Spin tip="Loading..." size="large" />
        //     </div>
        // );
    }

    console.log(error, "error", createdData, "data");

    return (
        <Form onFinish={handleSubmit(onSubmit)} {...formItemLayout}>
            <AccountInput formArr={productFormArr} control={control} errors={errors} />
            <button type="submit">create product</button>
        </Form>
    );
};

export default AddNewProduct;

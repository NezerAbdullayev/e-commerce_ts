import { Form } from "antd";
import { FC, useEffect } from "react";
import { useCreateNewProductMutation } from "../../../../redux/services/adminApi";

const AddNewProduct: FC = () => {
    const [createNewProduct, { data:createdData, error, isLoading }] = useCreateNewProductMutation();

    useEffect(()=>{
    },[createdData,createNewProduct])
    return <Form>form</Form>;
};

export default AddNewProduct;

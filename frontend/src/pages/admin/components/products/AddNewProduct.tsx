import { FC, useEffect } from "react";
import { useCreateNewProductMutation } from "../../../../redux/services/adminApi";



const AddNewProduct: FC = () => {
    const [createNewProduct, { data: createdData, error, isLoading }] = useCreateNewProductMutation();

    useEffect(() => {}, [createdData, createNewProduct]);
    return <div>shema</div>;
};

export default AddNewProduct;

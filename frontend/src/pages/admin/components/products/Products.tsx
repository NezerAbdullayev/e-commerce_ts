import { FC, useCallback, useEffect, useState } from "react";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../../redux/services/adminApi";
import { Alert, Button, Col, Flex, Table, Modal, Form } from "antd";
import type { TableColumnsType } from "antd";
import { Products as ProductsType } from "../../../../types/globalTypes";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormInput from "../../../../components/Forms/FormInput";
import { NewProduct } from "./AddNewProduct";
import FormTextarea from "../../../../components/Forms/FormTextarea";
import FormInputFile from "../../../../components/Forms/FormInputFile";
import FormSelect from "../../../../components/Forms/FormSellect";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductSchema } from "../../../../validations/product.validation";
import { formItemLayout } from "../../../../utils/formLayoutsize";

interface DataType {
    key: React.Key;
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

const Products: FC = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [products, setProducts] = useState<DataType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 15;

    const { data: productsData, error, isLoading } = useGetAllProductsQuery({ page: currentPage, limit });

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

    const [deleteProduct] = useDeleteProductMutation();

    console.log(isEdit);

    const onDeleteProduct = async (id: string) => {
        Modal.confirm({
            title: "Do you want to delete this product?",
            onOk: async () => {
                console.log(id);
                const res = await deleteProduct({ id });
                if (res) console.log(res);
                else console.log("xeta bas verdi ");
            },
            okText: "Yes",
            okType: "danger",
        });
    };
    
    const onEditProduct = async (id: string) => {
        setIsEdit(true);
        console.log(id);
    };

    const onCloseEditModal = useCallback(() => {
        setIsEdit(false);
    }, []);

    useEffect(() => {
        if (productsData?.products?.length > 0) {
            const formattedData = productsData.products.map((product: ProductsType) => ({
                key: product._id,
                id: product._id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                brand: product.brand,
                rating: product.rating,
                image: product.image?.[0],
                category: product.category.toString().replace(/,/g, " "),
                description: product.description,
            }));
            setProducts(formattedData);
            setTotalPages(productsData.totalPages);
        }
    }, [productsData]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const columns: TableColumnsType<DataType> = [
        { title: "id", dataIndex: "id", key: "id", width: "20px" },
        { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            width: "10%",
            render: (image) => <img src={image} alt="product" style={{ width: "50px", height: "50px", objectFit: "cover" }} />,
        },
        { title: "stock", dataIndex: "stock", key: "stock" },
        { title: "brand", dataIndex: "brand", key: "brand" },
        { title: "Price", dataIndex: "price", key: "price", sorter: (a, b) => a.price - b.price, render: (text) => `$${text}` },
        { title: "category", dataIndex: "category", key: "category" },
        {
            title: "Action",
            dataIndex: "x",
            key: "x",
            render: (_, record) => {
                return (
                    <Flex gap={10}>
                        <Button icon={<EditIcon />} onClick={() => onEditProduct(record.id)} />
                        <Button icon={<DeleteIcon />} onClick={() => onDeleteProduct(record.id)} danger />
                    </Flex>
                );
            },
        },
    ];

    console.log("re-render-admin");

    if (isLoading) {
        console.log(isLoading);
        // return (
        //     <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
        //         <Spin tip="Loading..." size="large" />
        //     </div>
        // );
    }

    if (error) {
        return (
            <Alert
                message="Error"
                description="There was an issue fetching the products. Please try again later."
                type="error"
                showIcon
                style={{ margin: 20 }}
            />
        );
    }

    return (
        <Col style={{ width: "100%", overflow: "scroll" }}>
            <Table
                style={{ minWidth: 800 }}
                columns={columns}
                dataSource={products}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: (record) => record.name !== "Not Expandable",
                }}
                pagination={{ pageSize: limit, position: ["bottomCenter"], total: totalPages * limit, onChange: handlePageChange }}
            />
            <Modal title="Edit Product" open={isEdit} onCancel={onCloseEditModal} onOk={() => setIsEdit(false)} okText="Save">
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
            </Modal>
        </Col>
    );
};

export default Products;

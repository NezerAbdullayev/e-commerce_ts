import { FC, useCallback, useEffect, useState } from "react";
// import { Products as ProductsType } from "../../../../types/globalTypes";
import { Products as ProductsType } from "../../../../redux/services/types/products.types";
import { createProductSchema } from "../../../../validations/product.validation";
import { toast } from "react-toastify";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import { Alert, Button, Col, Flex, Table, Modal, Form } from "antd";
import type { TableColumnsType } from "antd";
import { Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Custom Components
import FormInput from "../../../../components/Forms/FormInput";
import FormTextarea from "../../../../components/Forms/FormTextarea";
import FormInputFile from "../../../../components/Forms/FormInputFile";
import Loading from "../../../../components/Loading";
import Error from "../Error";
import FormSelect from "../../../../components/Forms/FormSellect";

// Hooks
import { useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductMutation } from "../../../../redux/services/productsApi";
import { useGetAllCategoryQuery } from "../../../../redux/services/categoryApi";
import { NewProduct } from "../createProduct/AddNewProduct";

interface DataType {
    key: React.Key;
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}
//{ products: Array(14), currentPage: 1, totalPages: 2, totalProducts: 20}

const TableProducts: FC = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [products, setProducts] = useState<DataType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const limit = 14;

    const { data: productsData, error: productError, isLoading: productLoading } = useGetAllProductsQuery({ page: currentPage, limit });
    const { data: AllCategories, isLoading: categoryLoading, error: categoryError } = useGetAllCategoryQuery();
    console.log(productsData);

    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();

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

    const onDeleteProduct = async (id: string) => {
        Modal.confirm({
            title: "Do you want to delete this product?",
            onOk: async () => {
                try {
                    await deleteProduct({ id });
                    toast.success("Product updated successfully!");
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to update the product. Please try again.");
                }
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

    console.log(productsData);
    // {products: Array(14), currentPage: 1, totalPages: 2, totalProducts: 20}

    useEffect(() => {
        if (productsData && productsData?.products?.length > 0) {
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

    return (
        <Col style={{ width: "100%", overflow: "scroll" }}>
            {productLoading ? (
                <Loading />
            ) : productError ? (
                <Error message="There was an issue fetching the products. Please try again later." />
            ) : (
                productsData && (
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
                )
            )}
            {/* modal */}
            <Modal title="Edit Product" open={isEdit} onCancel={onCloseEditModal} onOk={() => setIsEdit(false)} okText="Save">
                <Box className="px-10 py-5">
                    <Form onFinish={handleSubmit(onSubmit)}>
                        <FormInput<NewProduct> error={errors.name?.message} name="name" control={control} />
                        <Box display="grid" gridTemplateColumns={"1fr 1fr"} mb={2} gap={2}>
                            <FormInput<NewProduct> error={errors.price?.message} name="price" type="number" control={control} />
                            <FormInput<NewProduct> error={errors.stock?.message} name="stock" type="number" control={control} />
                        </Box>

                        <Box display="grid" gridTemplateColumns={"1fr 1fr"} mb={2} gap={2}>
                            <FormInput<NewProduct> error={errors.brand?.message} name="brand" control={control} />
                            <Box className="relative max-h-[100px]">
                                {categoryLoading ? (
                                    <Loading />
                                ) : categoryError ? (
                                    <Error message="An error occurred while fetching the categories" />
                                ) : (
                                    AllCategories && (
                                        <FormSelect<NewProduct>
                                            error={errors.category?.message}
                                            name="category"
                                            control={control}
                                            options={AllCategories}
                                            multiple={true}
                                        />
                                    )
                                )}
                            </Box>
                        </Box>
                        <FormTextarea<NewProduct> error={errors.description?.message} name="description" control={control} />
                        <FormInputFile<NewProduct> error={errors.image?.message} name="image" control={control} />
                    </Form>
                </Box>
            </Modal>
        </Col>
    );
};

export default TableProducts;

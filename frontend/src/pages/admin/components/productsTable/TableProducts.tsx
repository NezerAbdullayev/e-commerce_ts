import { FC, useCallback, useEffect, useState } from "react";
// import { Products as ProductsType } from "../../../../types/globalTypes";
import { createProductSchema } from "../../../../validations/product.validation";
import { toast } from "react-toastify";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import { Button, Col, Flex, Table, Modal, Form } from "antd";
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

const TableProducts: FC = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productResData, setProductResData] = useState<DataType[]>([]);
    const [editProductId, setEditPorductId] = useState<string>("");

    const limit = 14;

    const { data: productsData, error: productError, isLoading: productLoading } = useGetAllProductsQuery({ page: currentPage, limit });
    const { data: AllCategories, isLoading: categoryLoading, error: categoryError } = useGetAllCategoryQuery();

    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct, { error }] = useUpdateProductMutation();

    if (error) console.log(error);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewProduct>({ resolver: yupResolver(createProductSchema) });

    const columns: TableColumnsType<DataType> = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            width: "10%",
            render: (image) => <img src={image[0]} alt="product" style={{ width: "50px", height: "50px", objectFit: "cover" }} />,
        },
        { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: "stock", dataIndex: "stock", key: "stock" },
        { title: "brand", dataIndex: "brand", key: "brand" },
        { title: "Price", dataIndex: "price", key: "price", sorter: (a, b) => a.price - b.price, render: (text) => `$${text}` },
        {
            title: "category",
            dataIndex: "category",
            key: "category",
            render: (category) => <div>{category.toString().replace(/,/g, " ")}</div>,
        },
        {
            title: "Action",
            dataIndex: "x",
            key: "x",
            render: (_, record) => {
                return (
                    <Flex gap={10}>
                        <Button icon={<EditIcon />} onClick={() => onEditProduct(record)} />
                        <Button icon={<DeleteIcon />} danger onClick={() => onDeleteProduct(record.id)} />
                    </Flex>
                );
            },
        },
    ];

    useEffect(() => {
        if (productsData && productsData.products.length > 0) {
            const formattedData = productsData.products.map((product) => ({
                key: product._id,
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                stock: product.stock,
                brand: product.brand || "-",
                category: product.category,
                description: product.description,
            }));
            setProductResData(formattedData);
        }
    }, [productsData]);

    const onDeleteProduct = useCallback(
        (id: string) => {
            Modal.confirm({
                title: "Do you want to delete this product?",
                onOk: async () => {
                    try {
                        await deleteProduct({ id });
                        toast.success("Product deleted successfully!");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to delete the product. Please try again.");
                    }
                },
                okText: "Yes",
                okType: "danger",
            });
        },
        [deleteProduct],
    );

    const onEditProduct = async (record) => {
        setEditPorductId(record.id);
        setIsEdit(true);

        reset({
            name: record.name,
            price: record.price,
            stock: record.stock,
            brand: record.brand === "-" ? "" : record.brand,
            category: record.category.map((c) => c._id),
            description: record.description,
            image: record.image.map((url) => ({
                uid: url,
                name: url.split("/").pop(),
                status: "done",
                url: url,
            })),
        });
    };

    const onCloseEditModal = useCallback(() => {
        setIsEdit(false);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const onSubmit: SubmitHandler<NewProduct> = async (data) => {
        updateProduct({ data: { ...data, id: editProductId } });

        reset();
    };

    console.log("re-rendering");

    return (
        <Col style={{ width: "100%", overflow: "scroll" }}>
            {productLoading ? (
                <Loading />
            ) : productError ? (
                <Error message="There was an issue fetching the products. Please try again later." />
            ) : (
                productsData?.products && (
                    <Table
                        scroll={{ x: true }}
                        style={{ minWidth: 800 }}
                        columns={columns}
                        dataSource={productResData}
                        pagination={{
                            pageSize: limit,
                            position: ["bottomCenter"],
                            total: productsData.totalProducts,
                            onChange: handlePageChange,
                        }}
                    />
                )
            )}

            {/* modal */}
            <Modal title="Edit Product" open={isEdit} onCancel={onCloseEditModal} onOk={handleSubmit(onSubmit)} okText="Save">
                <Box className="py-5">
                    <Form onFinish={handleSubmit(onSubmit)}>
                        <Box display="grid" gridTemplateColumns={"1fr 1fr"} mb={2} gap={2}>
                            <FormInput<NewProduct> error={errors.name?.message} name="name" control={control} />
                            <FormInput<NewProduct> error={errors.price?.message} name="price" type="number" control={control} />
                        </Box>
                        <Box display="grid" gridTemplateColumns={"1fr 1fr"} mb={2} gap={2}>
                            <FormInput<NewProduct> error={errors.stock?.message} name="stock" type="number" control={control} />
                            <FormInput<NewProduct> error={errors.brand?.message} name="brand" control={control} />
                        </Box>
                        <FormTextarea<NewProduct> error={errors.description?.message} name="description" control={control} />
                        <Box display="grid" gridTemplateColumns={"1fr 1fr"} mb={2} gap={2}>
                            <Box>
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
                            <FormInputFile<NewProduct> error={errors.image?.message} name="image" control={control} />
                        </Box>

                        <Button htmlType="submit" className="mt-4 w-full py-5" type="primary">
                            Update Product
                        </Button>
                    </Form>
                </Box>
            </Modal>
        </Col>
    );
};

export default TableProducts;

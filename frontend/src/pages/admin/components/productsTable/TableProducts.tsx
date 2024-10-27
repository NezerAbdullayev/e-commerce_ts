import { FC, useCallback, useEffect, useMemo, useState } from "react";
// import { Products as ProductsType } from "../../../../types/globalTypes";
import { createProductSchema } from "../../../../validations/product.validation";
import { toast } from "react-toastify";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import { Button, Col, Table, Modal, Form } from "antd";
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
import { useDeleteProductMutation, useUpdateProductMutation } from "../../../../redux/services/productsApi";
import { useProducts } from "../../../../hooks/use-TableProduct";
import { NewProduct } from "../createProduct/AddNewProduct";
import { CategoryResponse } from "../../../../globalTypes/globalTypes";
import { convertImagesToBase64 } from "../../../../utils/convertImagesToBase64";
import { useTranslation } from "react-i18next";
import { FilterState } from "../../../../hooks/use-filters";

interface BaseProduct {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string[];
}

interface DataType extends BaseProduct {
    stock: number;
    brand: string;
    key: React.Key;
    category: CategoryResponse[];
}

interface ProductRecord extends BaseProduct {
    stock: number;
    brand: string;
    category: { _id: string }[];
}

interface TableProductsResponse {
    filtersParams: FilterState;
}

const TableProducts: FC<TableProductsResponse> = ({ filtersParams }) => {
    const { t } = useTranslation();

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productResData, setProductResData] = useState<DataType[]>([]);
    const [editProductId, setEditPorductId] = useState<string>("");

    const limit = 14;

    // useProducts hookunu çağırın
    const { productsData, productError, productLoading, AllCategories, categoryLoading, categoryError } = useProducts(
        currentPage,
        limit,
        filtersParams,
    );

    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewProduct>({ resolver: yupResolver(createProductSchema) });

    const onDeleteProduct = useCallback(
        async (id: string) => {
            Modal.confirm({
                title: t("deleteConfirmation"),
                onOk: async () => {
                    try {
                        await deleteProduct({ id });
                        toast.success(t("deleteSuccess"));
                    } catch (error) {
                        console.error(error);
                        toast.error(t("deleteError"));
                    }
                },
            });
        },
        [deleteProduct, t],
    );

    const onEditProduct = useCallback(
        (record: ProductRecord | ProductRecord) => {
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
        },
        [reset],
    );

    const columns: TableColumnsType<DataType> = useMemo(
        () => [
            {
                title: "Image",
                dataIndex: "image",
                key: "image",
                render: (image) => <img src={image[0]} alt="product" style={{ width: "50px", height: "50px", objectFit: "cover" }} />,
            },
            { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
            { title: "Stock", dataIndex: "stock", key: "stock" },
            { title: "Brand", dataIndex: "brand", key: "brand" },
            { title: "Price", dataIndex: "price", key: "price", sorter: (a, b) => a.price - b.price, render: (text) => `$${text}` },
            {
                title: "Category",
                dataIndex: "category",
                key: "category",
                render: (category) => category.map((c: CategoryResponse) => c.name).join(", "),
            },
            {
                title: "Action",
                key: "action",
                render: (_, record) => (
                    <div>
                        <Button icon={<EditIcon />} onClick={() => onEditProduct(record)} className="mr-2" />
                        <Button icon={<DeleteIcon />} danger onClick={() => onDeleteProduct(record.id)} />
                    </div>
                ),
            },
        ],
        [onDeleteProduct, onEditProduct],
    );

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

    const onCloseEditModal = useCallback(() => {
        setIsEdit(false);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const onSubmit: SubmitHandler<NewProduct> = async (data) => {
        console.log({ ...data, id: editProductId });

        const imagesUrl = data.image.filter((img) => !!img.url).map((i) => i.url);

        const convertedImages = data.image.filter((img) => !img.url);

        console.log(convertedImages);
        let base64Images: string[] = [];

        if (convertedImages.length > 0) {
            base64Images = await convertImagesToBase64(convertedImages);
        }

        const reqImages = [...imagesUrl, ...base64Images];

        try {
            await updateProduct({
                data: { ...data, id: editProductId, image: reqImages },
            }).unwrap();
            toast.success(t("editSuccess"));
            reset();
            onCloseEditModal();
        } catch (error) {
            console.error(error);
            toast.error(t("editError"));
        }
    };

    return (
        <Col style={{ width: "100%", overflow: "scroll" }}>
            {productLoading ? (
                <Loading />
            ) : productError ? (
                <Error message={t("fetchError")} />
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
            <Modal title={t("edit_product")} open={isEdit} onCancel={onCloseEditModal} onOk={handleSubmit(onSubmit)} okText="Save">
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
                                    <Error message={t("error_categories")} />
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
                    </Form>
                </Box>
            </Modal>
        </Col>
    );
};

export default TableProducts;

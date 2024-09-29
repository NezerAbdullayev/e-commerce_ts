import { FC, useCallback, useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../../../redux/services/adminApi";
import { Alert, Col, Spin, Table } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

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
    { title: "Price", dataIndex: "price", key: "price", sorter: (a, b) => a.price - b.price, render: (text) => `$${text}` },
    { title: "category", dataIndex: "category", key: "category" },
    {
        title: "Action",
        dataIndex: "x",
        key: "x",
        render: () => <a>Delete</a>,
    },
];

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    isFeatured: boolean;
}

const Products: FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 1;

    console.log("re-render");

    const { data: productsData, error, isLoading } = useGetAllProductsQuery({ page: currentPage, limit });

    useEffect(() => {
        if (productsData?.products?.length > 0) {
            const formattedData = productsData.products.map((product: Product) => ({
                key: product._id,
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                description: product.description,
            }));
            setData(formattedData);
            setTotalPages(productsData.totalPages);
        }
    }, [productsData]);

    console.log("error", error, isLoading);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    if (isLoading) {
        return (
            <Spin
                tip="Loading..."
                size="large"
                style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
            />
        );
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
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: (record) => record.name !== "Not Expandable",
                }}
                dataSource={data}
                pagination={{ pageSize: limit, position: ["bottomCenter"], total: totalPages * limit, onChange: handlePageChange }}
            />
        </Col>
    );
};

export default Products;

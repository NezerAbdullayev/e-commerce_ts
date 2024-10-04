import { FC, useCallback, useEffect, useState } from "react";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../../redux/services/adminApi";
import { Alert, Col, Table } from "antd";
import type { TableColumnsType } from "antd";
import { Products as ProductsType } from "../../../../types/globalTypes";

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
    const [products, setProducts] = useState<DataType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 15;

    const { data: productsData, error, isLoading } = useGetAllProductsQuery({ page: currentPage, limit });

    const [deleteProduct] = useDeleteProductMutation();

    const handleProductDelete = async (id: string) => {
        console.log(id);
        const res = await deleteProduct({ id });
        if (res) console.log(res);
        else console.log("xeta bas verdi ");
    };

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

    console.log("error", error, isLoading);

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
            render: (_, record) => <a onClick={() => handleProductDelete(record.id)}>Delete</a>,
        },
    ];

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
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: (record) => record.name !== "Not Expandable",
                }}
                dataSource={products}
                pagination={{ pageSize: limit, position: ["bottomCenter"], total: totalPages * limit, onChange: handlePageChange }}
            />
        </Col>
    );
};

export default Products;

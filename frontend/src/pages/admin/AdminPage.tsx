import React, { FC, useCallback, useState } from "react";

import { AppstoreAddOutlined, } from "@ant-design/icons";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { Layout, Menu, MenuProps, theme } from "antd";

import Analytics from "./components/analytics/Analytics.tsx";
import Products from "./components/products/Products.tsx";

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    zIndex: "9999",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "unset",
};
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    { key: "1", icon: <AppstoreAddOutlined />, label: "Dashboard" },
    {
        key: "sub1",
        label: "Management",
        icon: <AutoAwesomeMotionIcon />,
        children: [
            { key: "4", label: "Add new Product" },
            { key: "5", label: "Add Order" },
        ],
    },
    { key: "3", icon: <div />, label: "Analytics" },
];

const AdminPage: FC = () => {
    const [current, setCurrent] = useState("1");

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

    const renderContent = useCallback(() => {
        switch (current) {
            case "1":
                return <Products />;
            case "2":
                return <div>crud</div>;
            case "3":
                return <Analytics />;
            default:
                return <div>page not found</div>;
        }
    }, [current]);

    return (
        <Layout hasSider style={{ padding: 0,minHeight:"100vh" }}>
            <Sider style={siderStyle}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    style={{ width: 256, margin: "20px 0" }}
                    selectedKeys={[current]}
                    items={items}
                    onClick={onClick}
                />
            </Sider>
            <Layout style={{ marginInlineStart: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer, textAlign: "center", fontWeight: "bold", fontSize: "28px" }}>
                    WELCOME TO ADMIN
                </Header>
                <Content style={{ overflow: "initial", maxWidth: "95%", margin: "10px auto", width: "1200px" }}>
                    <div
                        style={{
                            textAlign: "center",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {renderContent()}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;

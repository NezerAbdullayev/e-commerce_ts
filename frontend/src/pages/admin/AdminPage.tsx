import React, { FC, useCallback, useState } from "react";

import { AppstoreAddOutlined, LineChartOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import Analytics from "./components/analytics/Analytics";

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "unset",
};
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    { key: "1", icon: <AppstoreAddOutlined />, label: "All Products" },
    { key: "2", icon: <LineChartOutlined />, label: "Analytics" },
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
                return <div>All Products Content Here</div>;
            case "2":
                return <Analytics />;
            default:
                return <div>Welcome to Admin</div>;
        }
    }, [current]);

    return (
        <Layout hasSider style={{ padding: 0 }}>
            <Sider style={siderStyle}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    style={{ width: 256, margin: "20px 0" }}
                    defaultOpenKeys={["sub1"]}
                    selectedKeys={[current]}
                    items={items}
                    onClick={onClick}
                />
            </Sider>
            <Layout style={{ marginInlineStart: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer, textAlign: "center", fontWeight: "bold", fontSize: "28px" }}>
                    WELCOME TO ADMIN
                </Header>
                <Content style={{ overflow: "initial", margin: 0 }}>
                    <div
                        style={{
                            height: 3000,
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

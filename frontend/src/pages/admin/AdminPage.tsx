import React, { FC } from "react";
// components
import { AppstoreAddOutlined } from "@ant-design/icons";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Layout, theme } from "antd";

import { Outlet } from "react-router";
import { Box, Typography } from "@mui/material";
import Link from "./components/Link";

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

const AdminPage: FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout hasSider style={{ padding: 0, minHeight: "100vh" }}>
            {/* sidebar */}
            <Sider style={siderStyle}>
                <Box mt={1}>
                    <Link to="/admin/dashboard">
                        <BarChartIcon className="mr-2 text-xl" />
                        <Typography variant="body1" component="span">
                            Dashboard
                        </Typography>
                    </Link>

                    <Link to="/admin/products">
                        <AppstoreAddOutlined className="mr-2 text-xl" />
                        <Typography variant="body1" component="span">
                            Products
                        </Typography>
                    </Link>

                    <Link to="/admin/createProduct">
                        <PlaylistAddCircleIcon className="mr-2 text-xl" />
                        <Typography variant="body1" component="span">
                            Create New Product
                        </Typography>
                    </Link>

                    <Link to="/admin/categorys">
                        <CategoryIcon className="mr-2 text-xl" />
                        <Typography variant="body1" component="span">
                            Category
                        </Typography>
                    </Link>

                    <Link to="/admin/users">
                        <GroupIcon className="mr-2 text-xl" />
                        <Typography variant="body1" component="span">
                            Users
                        </Typography>
                    </Link>
                </Box>
            </Sider>

            {/* content */}
            <Layout style={{ marginInlineStart: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer, textAlign: "center", fontWeight: "bold", fontSize: "28px" }}>
                    WELCOME TO ADMIN
                </Header>
                <Content style={{ overflow: "initial", maxWidth: "95%", margin: "10px auto", width: "1200px" }}>
                    <Box
                        style={{
                            textAlign: "center",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                        minHeight={"90vh"}
                    >
                        <Outlet />
                    </Box>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;

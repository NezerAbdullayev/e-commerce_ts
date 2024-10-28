import React, { FC } from "react";
// components
import { AppstoreAddOutlined } from "@ant-design/icons";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import { CiLogout } from "react-icons/ci";
import { Layout } from "antd";
import { Outlet } from "react-router";
import { Box, Typography } from "@mui/material";
import Link from "./components/Link";
import { useUserLogoutMutation } from "../../redux/services/authApi";
import EditLogo from "./components/EditLogo";
import LogoContainer from "../../components/logo/LogoContainer";
import { useTranslation } from "react-i18next";
import Translate from "../../components/translate/Translate";

const { Content, Sider } = Layout;

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
    const { t } = useTranslation();
    const [userLogout, { isLoading }] = useUserLogoutMutation();

    const logout = () => {
        userLogout();
    };

    return (
        <Layout hasSider style={{ padding: 0, minHeight: "100vh" }}>
            {/* sidebar */}
            <Sider style={siderStyle}>
                <Box className="flex h-full flex-col justify-between">
                    <Box>
                        {/* logo */}
                        <Box p={1} color={"white"} mb={4} borderBottom={1} bgcolor={"#30299e"}>
                            <LogoContainer />
                        </Box>

                        {/* translate */}
                        <Box className="mb-2 border-b">
                            <Translate />
                        </Box>

                        {/* navs */}
                        <Link to="/admin/dashboard">
                            <BarChartIcon className="mr-2 text-xl" />
                            <Typography variant="body1" component="span">
                                {t("dashboard")}
                            </Typography>
                        </Link>

                        <Link to="/admin/products">
                            <AppstoreAddOutlined className="mr-2 text-xl" />
                            <Typography variant="body1" component="span">
                                {t("products")}
                            </Typography>
                        </Link>

                        <Link to="/admin/createProduct">
                            <PlaylistAddCircleIcon className="mr-2 text-xl" />
                            <Typography variant="body1" component="span">
                                {t("createNewProduct")}
                            </Typography>
                        </Link>

                        <Link to="/admin/categories">
                            <CategoryIcon className="mr-2 text-xl" />
                            <Typography variant="body1" component="span">
                                {t("category")}
                            </Typography>
                        </Link>

                        <Link to="/admin/users">
                            <GroupIcon className="mr-2 text-xl" />
                            <Typography variant="body1" component="span">
                                {t("users")}
                            </Typography>
                        </Link>
                    </Box>

                    {/* edit and logout */}
                    <Box>
                        <EditLogo />
                        <Box className="mb-14 flex cursor-pointer items-center rounded p-2 text-gray-300 transition-colors duration-300 hover:bg-gray-500">
                            <CiLogout className="mr-2 text-xl" />
                            <Typography variant="body1" component="span" onClick={logout} aria-disabled={isLoading}>
                                {t("logout")}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Sider>

            {/* content */}
            <Layout style={{ marginInlineStart: 200 }}>
                <Content style={{ overflow: "initial", maxWidth: "95%", margin: "10px auto", width: "1200px" }}>
                    <Box
                        style={{
                            textAlign: "center",
                        }}
                        minHeight={"90vh"}
                        mt={10}
                    >
                        <Outlet />
                    </Box>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;

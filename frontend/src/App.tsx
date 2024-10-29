import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";

import { useSelector } from "react-redux";
import { userRole } from "./redux/slice/authSlice";
import "./utils/i18n";

import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import IsAdminRoute from "./components/AdminRoute";

// Lazy loading components

// client
const AppLayout = lazy(() => import("./layout/AppLayout"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const CartPage = lazy(() => import("./pages/cart/CartPage"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const LoginPage = lazy(() => import("./pages/login/LoginPage"));
const SignupPage = lazy(() => import("./pages/signup/SignupPage"));
const ProductsPage = lazy(() => import("./pages/products/ProductsPage"));
const DetailsPage = lazy(() => import("./pages/details/DetailsPage"));
const FavoritesPage = lazy(() => import("./pages/favorites/FavoritesPage"));
const PageNotFound = lazy(() => import("./pages/error/PageNotFound"));
const MyOrders = lazy(() => import("./pages/orders/MyOrders"));

// admin
const Dashboard = lazy(() => import("./pages/admin/components/dashboard/Dashboard"));
const UsersTable = lazy(() => import("./pages/admin/components/usersTable/UsersTable"));
const AddNewProduct = lazy(() => import("./pages/admin/components/createProduct/AddNewProduct"));
const AdminProducts = lazy(() => import("./pages/admin/components/productsTable/AdminProducts"));
const Categories = lazy(() => import("./pages/admin/components/category/Categories"));
const AdminOrders = lazy(() => import("./pages/admin/components/order/AdminOrders"));

const App: React.FC = () => {
    const role = useSelector(userRole);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{ top: "100px" }}
            />
            <Suspense fallback={<Loading />}>
                <Routes>
                    {/* Admin panel */}
                    <Route path="/admin" element={role === "admin" ? <AdminPage /> : <Navigate to="/" />}>
                        <Route index element={<Navigate to="dashboard" />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="users" element={<UsersTable />} />
                        <Route path="createProduct" element={<AddNewProduct />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="orders" element={<AdminOrders />} />
                    </Route>

                    {/* Auth */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* App layout routes */}
                    <Route
                        path="/"
                        element={
                            <IsAdminRoute>
                                <AppLayout />
                            </IsAdminRoute>
                        }
                    >
                        <Route index element={<HomePage />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="product/:id" element={<DetailsPage />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="favorites" element={<FavoritesPage />} />
                            <Route path="cart" element={<CartPage />} />
                            <Route path="orders" element={<MyOrders />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;

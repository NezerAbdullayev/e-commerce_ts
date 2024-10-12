import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/home/HomePage";
import CartPage from "./pages/cart/CartPage";
import AdminPage from "./pages/admin/AdminPage";

import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ProductsPage from "./pages/products/ProductsPage";
import DetailsPage from "./pages/details/DetailsPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import PageNotFound from "./pages/error/PageNotFound";
import PirvateRoute from "./components/PirvateRoute";
import { userRole } from "./redux/slice/userSlice";
import { useSelector } from "react-redux";
import Dashboard from "./pages/admin/components/dashboard/Dashboard";
import UsersTable from "./pages/admin/components/usersTable/UsersTable";
import AddNewProduct from "./pages/admin/components/createProduct/AddNewProduct";
import TableProducts from "./pages/admin/components/productsTable/TableProducts";
import Categories from "./pages/admin/components/category/Categories";

const App: React.FC = () => {
    const role = useSelector(userRole);

    return (
        <BrowserRouter>
            <Routes>
                {/* Admin panel */}
                <Route path="/admin" element={role === "admin" ? <AdminPage /> : <Navigate to="/" />}>
                    <Route index element={<Navigate to="dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<TableProducts />} />
                    <Route path="users" element={<UsersTable />} />
                    <Route path="createProduct" element={<AddNewProduct />} />
                    <Route path="categorys" element={<Categories />} />
                </Route>

                {/* auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* App layout routes */}
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="product/:id" element={<DetailsPage />} />

                    <Route
                        path="favorites"
                        element={
                            <PirvateRoute>
                                <FavoritesPage />
                            </PirvateRoute>
                        }
                    />

                    <Route
                        path="cart"
                        element={
                            <PirvateRoute>
                                <CartPage />
                            </PirvateRoute>
                        }
                    />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

// https://au.pinterest.com/alarnahope/mens-style-types/trend-setter/

export default App;

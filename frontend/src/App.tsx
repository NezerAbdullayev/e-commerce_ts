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

const App: React.FC = () => {
    const role = useSelector(userRole);

    return (
        <BrowserRouter>
            <Routes>
                {/* Admin route */}
                <Route path="/admin" element={role === "admin" ? <AdminPage /> : <Navigate to="/" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* <Route path="/admin" element={role === "admin" ? <AdminPage /> : <Navigate to="/" />}>

                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="createproduct" element={<CreateProduct />} />
                    <Route path="users" element={<Users />} />
                    
                </Route> */}

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
                    <Route path="about" element={<>div</>} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

// https://au.pinterest.com/alarnahope/mens-style-types/trend-setter/

export default App;

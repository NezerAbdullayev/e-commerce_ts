import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/home/HomePage";
import CartPage from "./pages/cart/CartPage";
import AdminPage from "./pages/admin/AdminPage";

import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ProductsPage from "./pages/products/PorductsPage";
import DetailsPage from "./pages/details/DetailsPage";

const App: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.user.role);

    console.log("re-render");
    return (
        <BrowserRouter>
            <Routes>
                {/* Admin route */}
                <Route path="/admin" element={userRole === "admin" ? <AdminPage /> : <Navigate to="/" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* App layout routes */}
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="cart" element={<CartPage />} />

                    <Route path="products" element={<ProductsPage />} />
                    {/* <Route path="product/:id" element={<DetailsPage />} /> */}
                    <Route path="about" element={<DetailsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

// https://au.pinterest.com/alarnahope/mens-style-types/trend-setter/

export default App;

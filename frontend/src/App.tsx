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
// import { userRole } from "./redux/slice/userSlice";
// import { useSelector } from "react-redux";

const App: React.FC = () => {
    // const role = useSelector(userRole);
    const role = "admin";

    console.log("re-render");
    return (
        <BrowserRouter>
            <Routes>
                {/* Admin route */}
                <Route path="/admin" element={role === "admin" ? <AdminPage /> : <Navigate to="/" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* App layout routes */}
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="cart" element={<CartPage />} />

                    <Route path="products" element={<ProductsPage />} />
                    <Route path="favorites" element={<FavoritesPage />} />
                    <Route path="product/:id" element={<DetailsPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="about" element={<>div</>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

// https://au.pinterest.com/alarnahope/mens-style-types/trend-setter/

export default App;

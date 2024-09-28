import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/home/HomePage";
import CartPage from "./pages/cart/CartPage";
import AdminPage from "./pages/admin/AdminPage";

// import { useSelector } from "react-redux";
// import { RootState } from "./redux/stor";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";

const App: React.FC = () => {
    // const userRole = useSelector((state: RootState) => state.user.role);
    const userRole = "admin";

    const router = createBrowserRouter([
        { path: "/login", element: <LoginPage /> },
        { path: "/signup", element: <SignupPage /> },
        // app layout
        {
            path: "/",
            element: <AppLayout />,
            children: [
                { path: "/", element: <HomePage /> },
                { path: "/cart", element: <CartPage /> },
            ],
        },
        // admin panel
        { path: "/admin", element: userRole === "admin" ? <AdminPage /> : <Navigate to="/" /> },
    ]);

    return <RouterProvider router={router} />;
};

export default App;

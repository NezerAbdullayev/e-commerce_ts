import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/home/HomePage";
import CartPage from "./pages/cart/CartPage";

const App: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout />,
            children: [
                { path: "/", element: <HomePage /> },
                { path: "/cart", element: <CartPage /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;

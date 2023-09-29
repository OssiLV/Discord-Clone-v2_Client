import "./index.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import SignUp from "@/pages/auth/SignUp.tsx";
import SignIn from "@/pages/auth/SignIn.tsx";
import { ThemeProvider } from "@/components/providers/theme-provider.tsx";
import PrivateRoute from "./components/private-route.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
);

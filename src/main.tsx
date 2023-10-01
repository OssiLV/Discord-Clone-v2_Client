import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import ErrorPage from "@/pages/ErrorPage.tsx";
import SignUp from "@/pages/auth/SignUp.tsx";
import SignIn from "@/pages/auth/SignIn.tsx";
import { ThemeProvider } from "@/components/providers/theme-provider.tsx";
import PrivateRoute from "./components/private-route.tsx";
import Me from "./pages/Me.tsx";
import ModalProvider from "./components/providers/modal-provider.tsx";
import DirectMessages from "./pages/DirectMessages.tsx";

const token = Cookies.get("access-token");
axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

const router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />,
    },
    {
        path: "channels/@me",
        element: (
            <PrivateRoute>
                <DirectMessages />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "channels/:serverId",
        element: (
            <PrivateRoute>
                <Me />
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
            <ModalProvider />
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
);

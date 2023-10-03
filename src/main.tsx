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
import ModalProvider from "./components/providers/modal-provider.tsx";
import DirectMessages from "./pages/DirectMessages.tsx";
import App from "./pages/App.tsx";
import Invite from "./pages/Invite.tsx";

const token = Cookies.get("access-token");
axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/invite/:inviteCode",
        element: <Invite />,
    },
    {
        path: "direct-messages/@me",
        element: (
            <PrivateRoute>
                <DirectMessages />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "servers/:serverId/channels/:channelId",
        element: (
            <PrivateRoute>
                <DirectMessages />
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

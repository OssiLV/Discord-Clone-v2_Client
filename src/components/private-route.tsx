import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = Cookies.get("access-token");

    if (!token) {
        return <Navigate to={"/sign-in"} replace />;
    }

    return children;
};

export default PrivateRoute;

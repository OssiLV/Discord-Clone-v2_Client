import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthorized = false;
    if (!isAuthorized) {
        return <Navigate to={"/sign-in"} replace />;
    }

    return children;
};

export default PrivateRoute;

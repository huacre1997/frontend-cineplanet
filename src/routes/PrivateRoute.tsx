import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

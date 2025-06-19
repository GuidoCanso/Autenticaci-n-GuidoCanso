import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Si no hay token, redirige al login
        return <Navigate to="/login" />;
    }

    // Si hay token, renderiza el contenido protegido
    return children;
};

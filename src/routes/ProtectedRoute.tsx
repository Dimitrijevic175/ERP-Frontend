import { Navigate } from "react-router-dom";
import type {JSX} from "react";

interface ProtectedRouteProps {
    roles: string[];
    children: JSX.Element;
}

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
    const role = localStorage.getItem("role");

    if (!role || !roles.includes(role)) {
        return <Navigate to="/no-access" replace />;
    }

    return children;
}
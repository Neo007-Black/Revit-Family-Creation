import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        // Not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Logged in but doesn't have the required role, redirect to home
        // Or could show a "403 Forbidden" component
        return <Navigate to="/" replace />;
    }

    // User is logged in and has permission, render the child routes
    return <Outlet />;
};

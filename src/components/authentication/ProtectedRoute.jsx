import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
    const token = localStorage.getItem("token"); 

    if (!user && !token) { 
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
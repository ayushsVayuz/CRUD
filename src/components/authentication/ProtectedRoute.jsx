import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavigationBar from '../layout/NavigationBar';

const ProtectedRoute = () => {
    const token = useSelector((state) => state.user?.token) || localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    );
};

export default ProtectedRoute;

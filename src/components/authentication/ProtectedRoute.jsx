import React from 'react';
import * as pkg from 'react-router-dom';
import { useSelector } from "react-redux";
import NavigationBar from '../layout/NavigationBar';

const ProtectedRoute = ({ children }) => {

    const { Navigate, Outlet } = pkg;
    const token = useSelector((state) => state.user?.token) || localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>
        <NavigationBar />
        <Outlet />
    </>;

};

export default ProtectedRoute;
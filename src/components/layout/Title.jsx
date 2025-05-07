import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Title = () => {
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (path.includes('/login')) {
            document.title = "Login | CRUD";
        } else if (path.includes('/signup')) {
            document.title = "Signup | CRUD";
        } else if (path.includes('/home')) {
            document.title = "Home | CRUD";
        } else if (path.includes('/about')) {
            document.title = "About | CRUD";
        } else if (path.includes('/createUser')) {
            document.title = "Create User | CRUD";
        } else if (path.includes('/updateUser')) {
            document.title = "Update User | CRUD";
        } else if (path.includes('/userDetails')) {
            document.title = "User Details | CRUD";
        }

        const titleMeta = document.querySelector('meta[property="og:title"]');
        const descriptionMeta = document.querySelector('meta[property="og:description"]');

        if (titleMeta && descriptionMeta) {
            if (path.includes('/home')) {
                titleMeta.setAttribute("content", "CRUD Application");
                descriptionMeta.setAttribute("content", "User Management");
            } else if (path.includes('/about')) {
                titleMeta.setAttribute("content", "About the Developer | CRUD Application");
                descriptionMeta.setAttribute("content", "Simple Introduction");
            }
        }
    }, [path]); 
    return null;
};

export default Title;

import React, { useEffect } from 'react'
import * as pkg from 'react-router-dom';

const Title = () => {

    const { useLocation } = pkg;
    let location = useLocation();
    let path = location.pathname

    /**
     * @param {string} path - Current URL pathname used to determine the page title.
     * @return {void} Updates the document's title without returning a value.
     */
    useEffect(() => {
        if (path.includes('/login')) {
            document.title = "Login | CRUD";
        } else if (path.includes('/signup')) {
            document.title = "Signup | CRUD";
        } else if (path.includes('/home')) {
            document.title = "Home | CRUD";
        } else if (path.includes('/about')) {
            document.title = "About | CRUD"
        } else if (path.includes('/createUser')) {
            document.title = "Create User | CRUD"
        } else if (path.includes('/updateUser')) {
            document.title = "Update User | CRUD"
        } else if (path.includes('/userDetails')) {
            document.title = "User Details | CRUD"
        }
    }, [location.pathname]);

    return null;
}

export default Title

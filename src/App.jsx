import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/layout/NavigationBar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import Login from './components/authentication/Login.jsx';
import ProtectedRoute from './components/authentication/ProtectedRoute.jsx';
import Signup from './components/authentication/Signup.jsx';
import { ToastContainer } from 'react-toastify';
import Layout from './components/layout/Layout.jsx';
import UserForm from './components/userComponents/UserForm.jsx';
import CheckInternetConnection from './components/CheckInternetConnection.jsx';



function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/login" />


        },
        {
          index: true,
          path: "/login",
          element: <Login />
        },
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: "/home",
          element: <ProtectedRoute ><NavigationBar /><HomePage /></ProtectedRoute>
        },
        {
          path: "/about",
          element: <ProtectedRoute ><NavigationBar /><AboutPage /></ProtectedRoute>
        },
        {
          path: "/createUser",
          element: <ProtectedRoute ><NavigationBar /><UserForm updating={false} /></ProtectedRoute>
        },
        {
          path: "/updateUser/:id",
          element: <ProtectedRoute ><NavigationBar /><UserForm updating={true} /></ProtectedRoute>
        }
      ]
    },

  ])

  return (
    <div>
      <CheckInternetConnection>
        <RouterProvider router={router} />

        <ToastContainer
          position="bottom-right"
          autoClose={2000}

        />
     </CheckInternetConnection>
    </div>

  )
}

export default App;



import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import CreateUser from './components/userComponents/CreateUser.jsx';
import UpdateUser from './components/userComponents/UpdateUser.jsx';
import NavigationBar from './components/layout/NavigationBar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import Login from './components/authentication/Login.jsx';
import ProtectedRoute from './components/authentication/ProtectedRoute.jsx';
import Signup from './components/authentication/Signup.jsx';
import { ToastContainer } from 'react-toastify';
import Layout from './components/layout/Layout.jsx';



function App() {

  const [isOnline, setOnline] = useState(navigator.onLine);

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
          index:true,
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
          element: <ProtectedRoute ><NavigationBar /><CreateUser /></ProtectedRoute>
        },
        {
          path: "/updateUser/:id",
          element: <ProtectedRoute ><NavigationBar /><UpdateUser /></ProtectedRoute>
        }
      ]
    },

  ])

  return (

    <div>
      {
        isOnline == true ? <RouterProvider router={router} /> : <h1 className='text-center mt-60 mb-60 h-screen text-[40px]'>You are not connected to internet.</h1>
      }
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
      />

    </div>

  )
}

export default App;



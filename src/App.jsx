import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import CreateUser from './components/userComponents/CreateUser.jsx';
import UpdateUser from './components/userComponents/UpdateUser.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import Login from './components/authentication/Login.jsx';
import ProtectedRoute from './components/authentication/ProtectedRoute.jsx';
import Signup from './components/authentication/Signup.jsx';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from "react-helmet-async";


function App() {

  const [isOnline, setOnline] = useState(navigator.onLine);
   
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />
    },
    {
      path: "/login",
      element:<Login/>
    },
    {
      path: "/signup",
      element:<Signup/>
    },
    {
      path: "/home",
      element:<ProtectedRoute ><NavigationBar/><HomePage/></ProtectedRoute>
    },
    {
      path: "/about",
      element:<ProtectedRoute ><NavigationBar/><AboutPage/></ProtectedRoute>
    },
    {
      path: "/createUser",
      element: <ProtectedRoute ><NavigationBar/><CreateUser/></ProtectedRoute>
    },
    {
      path:"/updateUser/:id",
      element:<ProtectedRoute ><NavigationBar/><UpdateUser/></ProtectedRoute>
    }
  ])

  return (
    <HelmetProvider>
    <div>
      {
        isOnline == true ? <RouterProvider router={router} /> : <h1 className='text-center mt-60 mb-60 h-screen text-[40px]'>You are not connected to internet.</h1>
      }
            <ToastContainer 
              position="bottom-right"  
              autoClose={2000} 
              hideProgressBar={false} 
              newestOnTop={true} 
              closeOnClick 
              rtl={false} 
              pauseOnFocusLoss 
              draggable 
              pauseOnHover 
            />

    </div>
    </HelmetProvider>
  )
}

export default App;



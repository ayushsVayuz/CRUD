import React, { useState, useEffect } from 'react';
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


function App() {

  const [isOnline, setOnline] = useState(navigator.onLine);

  const token = localStorage.getItem("token"); 
  const expiresAt = localStorage.getItem("expiresAt");

  let isAuthenticated = false;

  if (token && expiresAt) {
      const expiryTime = Number(expiresAt);
  
      if (Date.now() > expiryTime) {
          localStorage.removeItem("token");
          localStorage.removeItem("expiresAt");
      } else {
          isAuthenticated = true;
      }
  }
  
  const [user, setUser] = useState(isAuthenticated);
   
  
  // params:isAuthenticated(is user authenticated or not ) , set user's value either true or false based on parameter's value
  useEffect(() => {
    if (!isAuthenticated) { 
      setUser(false); 
    }
  }, [isAuthenticated]); 
  
   
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />
    },
    {
      path: "/login",
      element:<Login setUser={setUser}/>
    },
    {
      path: "/signup",
      element:<Signup/>
    },
    {
      path: "/home",
      element:<ProtectedRoute user={user}><NavigationBar/><HomePage/></ProtectedRoute>
    },
    {
      path: "/about",
      element:<ProtectedRoute user={user}><NavigationBar/><AboutPage/></ProtectedRoute>
    },
    {
      path: "/createUser",
      element: <ProtectedRoute user={user}><NavigationBar/><CreateUser/></ProtectedRoute>
    },
    {
      path:"/updateUser/:id",
      element:<ProtectedRoute user={user}><NavigationBar/><UpdateUser/></ProtectedRoute>
    }
  ])

  return (
    <div>
      {
        isOnline == true ? <RouterProvider router={router} /> : <h1 className='text-center mt-60 mb-60 h-screen text-[40px]'>You are not connected to internet.</h1>
      }
            <ToastContainer />
    </div>
  )
}

export default App;



import React from 'react';
import * as pkg from 'react-router-dom';;
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
import UserDetails from './components/userComponents/UserDetails.jsx';



function App() {

  const { createBrowserRouter, RouterProvider, Navigate } = pkg;
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
          element: <ProtectedRoute />,
          children: [
            {
              path: "/home",
              element: <HomePage />
            },
            {
              path: "/about",
              element: <AboutPage />
            },
            {
              path: "/createUser",
              element:
                <UserForm
                  updating={false} />
            },
            {
              path: "/updateUser/:id",
              element:
                <UserForm
                  updating={true} />
            },
            {
              path: "/userDetails/:id",
              element:
                <UserDetails />
            }
          ]
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

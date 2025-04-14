import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import About from './pages/About/About';
import Adduser from './components/Adduser';
import Home from './pages/home/Home';
import Edit from './components/Edit';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<><Nav /><Home /></>
    },
    {
      path: "/About",
      element:<><Nav /><About /></>
    },
    {
      path: "/Add",
      element: <><Nav/><Adduser/></>
    },
    {
      path:"/Edit/:id",
      element:<><Nav/><Edit/></>
    }
  ])
  return (
    <>
      
      <RouterProvider router={router} />
    </>
  )
}

export default App

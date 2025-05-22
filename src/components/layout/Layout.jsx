import React from 'react'
import Title from './Title'
import * as pkg from 'react-router-dom';

const Layout = () => {
   const { Outlet } = pkg;
  return (
    <div>
      <Title/>
      <Outlet/>
    </div>
  )
}

export default Layout

import React from 'react'
import Title from './Title'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Title/>
      <Outlet/>
    </div>
  )
}

export default Layout

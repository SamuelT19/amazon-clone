import React from 'react'
import Header from '../components/header/Header'
import { Outlet } from "react-router-dom";


function Layout({children}) {
  return (
      <>
          <Header />
          <Outlet/>
      </>
  )
}

export default Layout
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'

const Outlate = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default Outlate
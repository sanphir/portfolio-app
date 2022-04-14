import React from 'react'
import { Outlet } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h3>page not found</h3>
      <Outlet />
    </div>
  )
}

export default NotFound
import React from 'react'
import {Outlet, Link} from "react-router-dom"

function Layout() {
  return (
    <div>
      <>
        <Link to="/home">
          Home
        </Link> 
        <Link to="/ingredients">
          Ingredients
        </Link> 

        <Outlet />
      </>
    </div>
  )
}

export default Layout
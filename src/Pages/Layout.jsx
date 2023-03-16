import React from 'react'
import {Outlet, Link} from "react-router-dom"

function Layout() {
  return (
    <div>
      <>

        <Outlet /> 
        
        <Link to="/home">
          Home
        </Link> 
        <Link to="/ingredients">
          Ingredients
        </Link> 
      </>
    </div>
  )
}

export default Layout
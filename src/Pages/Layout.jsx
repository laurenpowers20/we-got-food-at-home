import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div>
      <>

        <Outlet /> 
        
      
      </>
    </div>
  );
}

export default Layout;

import "./Home.css";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth,db } from "../../services/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import React, { useState, useEffect } from 'react';


import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where
} from 'firebase/firestore';
function Home() {

  const [user, loading, error] = useAuthState(auth);
 

  return (
    
    <>






     
{/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
      <h1 className="home-heading">Welcome</h1>
      <button className="logout-button" onClick={logout}>logout</button>
      
          <Link to="/sign-in">
            <img src={logo} alt="logo" className="home-logo" />
          </Link>
        
        <h1 className="home-heading">Powered by AI</h1>



    </>
  );
}

export default Home;

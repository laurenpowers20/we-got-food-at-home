import "./Home.css";
import logo from "../../images/logo.png";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { logout, auth, db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";

function Home() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <div>
        <Link to="/ingredients"></Link>
      </div>
      <h1 className="home-heading">{`Welcome, ${user.displayName}`}</h1>

      <img src={logo} alt="google-photo" className="google-photo" />

      <div>
        <Link to="/ingredients">
          <button className="home-ingredients-button">Find Recipe</button>
        </Link>
      </div>
    
      <div>
        <button className="home-logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Home;

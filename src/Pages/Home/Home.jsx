import "./Home.css";
import logo from "../../images/logo.png";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Profile from "../Profile/Profile";
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
  const pfp = user.photoURL;
  return (
    <>
     
      
      <Profile pfp={pfp} />

      <div>
        <Link to="/ingredients">
          <button className="home-ingredients-button">I am ready to cook</button>
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

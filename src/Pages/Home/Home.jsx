import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <>
      <h1 className="home-heading">{`Welcome, ${user.displayName}`}</h1>
      <Profile />

      {/* <img src={logo} alt="google-photo" className="google-photo" /> */}

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

import "./Home.css";
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
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // loading screen
      return;
    }
    if (user) {
      setDisplayName(user.displayName);
      setPhotoURL(user.photoURL);
    }
    console.log(user);
  }, [user, loading]);

  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  } else if (!user) {
    navigate("/");
  }

  return (
    <>
      <Profile />

      <div>
        <Link to="/ingredients">
          <button className="home-ingredients-button">Give me a recipe!</button>
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

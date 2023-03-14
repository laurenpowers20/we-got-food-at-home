import "./Home.css";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth } from "../../services/firebase";
// import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (loading) {
  //     // loading screen
  //     return;
  //   }
  //   if (user) navigate("/");
  // }, [user, loading]);
  const pfp = user.photoURL;
  return (
    <>
      <h1 className="home-heading">Welcome, Name</h1>

      <Link to="/sign-in">
        <img src={pfp} alt="google-photo" className="google-photo" />
      </Link>
      <div>
        <button className="home-logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Home;

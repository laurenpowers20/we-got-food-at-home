import "./Home.css";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth } from "../../services/firebase";
// import { useEffect } from "react";
import {useAuthState} from "react-firebase-hooks/auth"

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
  const pfp = user.photoURL
  return (
    
      <>
      <h1 className="home-heading">Welcome</h1>
      <button className="logout-button" onClick={logout}>logout</button>
      
          <Link to="/sign-in">
            <img src={pfp} alt="logo" className="home-logo" />
          </Link>
        
        <h1 className="home-heading">Powered by AI</h1>
      </>
 
  );
}

export default Home;

import "./SignIn.css";
import {useEffect} from "react";
import React from "react";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {auth, signInWithGoogle} from "../../services/firebase"
import {useAuthState} from "react-firebase-hooks/auth";



function SignIn() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
   
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <div>

      <img src={logo} alt="logo" className="signin-logo" />
      <p>Sign In</p>
      <div className="sign-in-form-container">

        {/* sign in using the google pop up */}
      
        <button className="sign-in-button" onClick={signInWithGoogle}>Log in With Google</button>
      
      </div>


      
    
    </div>
  );
}

export default SignIn;

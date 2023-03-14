import "./SignIn.css";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // loading screen
      return;
    }
    if (user) navigate("/home");
    console.log(user);
  }, [user, loading]);
  return (
    <div>
      <img src={logo} alt="logo" className="signin-logo" />

      <div className="sign-in-form-container">
        {/* sign in using the google pop up */}
        <button className="sign-in-button" onClick={signInWithGoogle}>
          Login With Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;

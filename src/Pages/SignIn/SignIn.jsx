import "./SignIn.css";
import logo from "../../images/logo.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function SignIn() {
  return (
    <>
      <img src={logo} alt="logo" className="signin-logo" />
      <p>---------- Create An Account ----------</p>

      <form className="sign-in-form"> 
        <input type="text" name="name" placeholder="Your name" />
        <input type="text" name="reply_to" placeholder="Your e-mail" />
        <input type="text" name="password" placeholder="Your e-mail" />
        <input type="checkbox" />
      </form>
    </>
  );
}

export default SignIn;

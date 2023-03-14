import "./SignIn.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";


function SignIn() {
  return (
    <>
      <img src={logo} alt="logo" className="signin-logo" />
      <p>Sign In</p>
      <div className="sign-in-form-container">
        <form className="sign-in-form">
          <input type="text" name="name" placeholder="Your name" />
          <input type="text" name="reply_to" placeholder="Your e-mail" />
          <input type="text" name="password" placeholder="Your e-mail" />
        </form>
      </div>
      <button className="sign-in-button">Log In</button>
      <Link to="/sign-up">
        <button className="sign-in-button">Create an account</button>
      </Link>
    </>
  );
}

export default SignIn;

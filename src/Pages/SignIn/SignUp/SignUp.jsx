import "./SignUp.css";
import logo from "../../images/logo.png";

function SignUp() {
  return (
    <>
      <img src={logo} alt="logo" className="signin-logo" />
      <p>---------- Create An Account ----------</p>
      <div className="sign-up-form-container">
        <form className="sign-up-form">
          <input type="text" name="name" placeholder="Your name" />
          <input type="text" name="reply_to" placeholder="Your e-mail" />
          <input type="text" name="password" placeholder="Password" />
          <input type="text" name="password" placeholder="Verify password" />
        </form>
      </div>
      <button className="sign-in-button">Sign Up</button>
    </>
  );
}

export default SignUp;

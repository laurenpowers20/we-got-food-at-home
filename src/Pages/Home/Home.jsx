import "./Home.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    
      <>
        <h1 className="home-heading">Welcome</h1>
      
          <Link to="/sign-in">
            <img src={logo} alt="logo" className="home-logo" />
          </Link>
        
        <h1 className="home-heading">Powered by AI</h1>
      </>
 
  );
}

export default Home;

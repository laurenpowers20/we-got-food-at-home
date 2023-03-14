import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import AddIngredients from "./Pages/AddIngredients/AddIngredients";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ingredients" element={<AddIngredients />} />
      </Routes>
    </div>
  );
}

export default App;

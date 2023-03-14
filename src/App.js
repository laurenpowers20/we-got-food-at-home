import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddIngredients from "./Pages/AddIngredients/AddIngredients";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import SetGoal from "./Pages/SetGoal/SetGoal";

import SignIn from "./Pages/SignIn/SignIn";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ingredients" element={<AddIngredients />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/set-goal" element={<SetGoal />} />
      </Routes>
    </div>
  );
}

export default App;

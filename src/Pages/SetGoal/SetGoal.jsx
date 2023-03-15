import "./SetGoal.css";

import { SlArrowLeft } from "react-icons/sl";

function SetGoal() {
  return (
    <div className="set-goal-component">
      <div className="set-goal-back-icon">
        <SlArrowLeft />
      </div>
      <h1>Set Goal</h1>

      <p>I'd like to cook...</p>
      <div className="set-goal">
        <div className="set-goal-divs">
          1-2 x week<div className="set-goal-level">Easy</div>
        </div>
        <div className="set-goal-divs">3-4 x week<div className="set-goal-level intermediate">Intermediate</div></div>
        <div className="set-goal-divs">5-7 x week<div className="set-goal-level">Hard</div></div>
        <div className="set-goal-divs">I'm not sure yet</div>
      </div>
    </div>
  );
}

export default SetGoal;

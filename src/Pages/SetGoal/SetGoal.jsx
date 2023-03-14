import "./SetGoal.css";

function SetGoal() {
  return (
    <div>
      <h1>Set Goal</h1>
      <p>I'd like to cook...</p>
      <div className="set-goal">
        <div className="set-goal-divs">1-2 x week</div>
        <div className="set-goal-divs">3-4 x week</div>
        <div className="set-goal-divs">5-7 x week</div>
        <div className="set-goal-divs">I'm not sure yet</div>
      </div>
    </div>
  );
}

export default SetGoal;

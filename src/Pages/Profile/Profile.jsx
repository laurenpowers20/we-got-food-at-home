import { AiFillHeart } from "react-icons/ai";
import { GiLightningShield } from "react-icons/gi";
import "./Profile.css";

function Profile() {
  return (
    <div>
      <div className="profile-top">
        <div className="profile-photo">Photo</div>

        <div className="profile-level container">
          <div>
            <div className="profile-bar-div top">
              <AiFillHeart />
              <div className="profile-level-bar one"> </div>{" "}
            </div>

            <div className="profile-bar-div bottom">
              <GiLightningShield />
              <div className="profile-level-bar two">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-bottom">
        {" "}
        <h2>Your Achievement</h2>
        <div className="achievement-image"></div>
        <h2>You're a bronze level cook!</h2>
      </div>
    </div>
  );
}

export default Profile;

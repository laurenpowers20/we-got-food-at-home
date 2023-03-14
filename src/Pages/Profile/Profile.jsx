import { IoMdTrophy } from "react-icons/io";
import { IoTrophyOutline } from "react-icons/io5";

function Profile() {
  return (
    <div>
      <h1>Name</h1>
      <div>Photo</div>
      <div>level1</div>
      <div>level2</div>
      <p>Your points: 40</p>
      <p>Your collection</p>
      <div>
        <IoMdTrophy /> <IoMdTrophy /> <IoMdTrophy /> <IoMdTrophy />{" "}
        <IoTrophyOutline /> <IoTrophyOutline /> <IoTrophyOutline />
      </div>
      <button>Ready to cook?</button>
    </div>
  );
}

export default Profile;

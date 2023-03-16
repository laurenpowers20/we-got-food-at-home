import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
// import { GiLightningShield } from "react-icons/gi";
import "./Profile.css";
import bronze from "../../images/bronze.png";
import silver from "../../images/silver.png";
import gold from "../../images/gold.png";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';
import { useEffect } from 'react';

function Profile() {
	const [currentLevel, setCurrentLevel] = useState(1);
	const [progressBar, setProgressBar] = useState(0);
	const [user, loading, error] = useAuthState(auth);
	const [displayName, setDisplayName] = useState('');
	const [photoURL, setPhotoURL] = useState('');
	useEffect(() => {
		if (loading) {
			// loading screen
			return;
		}
		if (user) {
			setDisplayName(user.displayName);
			setPhotoURL(user.photoURL);
		}
	}, [user, loading]);

	const levelImages = [
    { level: 0, src: `${bronze}`, status: "bronze" },
		{ level: 1, src: `${bronze}`, status: 'bronze' },
		{ level: 2, src: `${bronze}`, status: 'bronze' },
		{ level: 3, src: `${bronze}`, status: 'bronze' },
		{ level: 4, src: `${silver}`, status: 'silver' },
		{ level: 5, src: `${silver}`, status: 'silver' },
		{ level: 6, src: `${silver}`, status: 'silver' },
		{ level: 7, src: `${gold}`, status: 'gold' },
	];
	const currentImage = levelImages.find(
		(image) => image.level === currentLevel,
	).src;

	const handleLevelUp = () => {
		setCurrentLevel(currentLevel + 1);
		setProgressBar(progressBar + 10);
	};

  const handleLevelDown = () => {
    setCurrentLevel(currentLevel - 1);
    setProgressBar(progressBar - 10);
  };
  return (
    <div>
      <div className="profile-top">
        <div className="profile-photo">Photo</div>

				<div className='profile-level container'>
					<div>
						<div className='profile-bar-div top'>
							<AiFillHeart style={{ padding: '10px' }} />{' '}
							<div>
								<progress value={progressBar} max='64'></progress>
							</div>
						</div>

            <div className="profile-bar-div bottom">
              {/* <GiLightningShield style={{ padding: "10px" }} />
              <div className="profile-level-bar two"></div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="profile-bottom">
        {" "}
        <h2>Your Achievement</h2>
        <div className="achievement-image">
          {" "}
          <div>
            <img src={currentImage} alt={`Level ${currentLevel}`} />
						<div className='profile-bar-div bottom'>
							{/* <GiLightningShield style={{ padding: '10px' }} /> */}
							<div className='profile-level-bar two'>
								<div></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='profile-bottom'>
				{' '}
				<h2>Your Achievement</h2>
				<div className='achievement-image'>
					{' '}
					<div>
						<img src={currentImage} alt={`Level ${currentLevel}`} />

						<h3>{`You're a ${currentLevel}-level cook!`}</h3>
					</div>
				</div>
				<button
					className='profile-btn'
					disabled={currentLevel === 7}
					onClick={handleLevelUp}>
					I cooked at home today!
				</button>
				<button
					className='profile-btn'
					disabled={currentLevel === 0}
					onClick={handleLevelDown}>
					Oops, no I didn't!
				</button>
			</div>
		</div>
	);
}

export default Profile;

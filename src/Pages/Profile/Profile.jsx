import { GiForkKnifeSpoon } from "react-icons/gi";
import { useState } from "react";
// import { GiLightningShield } from "react-icons/gi";
import "./Profile.css";
import bronze from "../../images/bronze.png";
import silver from "../../images/silver.png";
import gold from "../../images/gold.png";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { logout, auth, db } from "../../services/firebase";


import {
	query,
	collection,
	onSnapshot,
	doc,
	addDoc,
	deleteDoc,
	where,
	updateDoc,
	serverTimestamp
} from 'firebase/firestore';
import { async } from "@firebase/util";



function Profile() {
	const [currentLevel, setCurrentLevel] = useState(1);
	const [progress, setProgress] = useState(0);
	const [user, loading, error] = useAuthState(auth);
	const [displayName, setDisplayName] = useState('');
	const [photoURL, setPhotoURL] = useState('');

	const [uId, setUId] = useState('');

	// /////////////////////////////////////////////////////////// //
	// /////////////////////////////////////////////////////////// //
	
	
	// const progressUpdate = async (e) => {
	// 	e.preventDefault();
		
	// 	// if (progress?.hasOwnProperty("id")) {
	// 		const docRef = doc(db, 'progressBar', progress.id, 'AknCONUnYZUNgCp4ps2b' );
	// 		const updatedProgress = { progressBarNumber: progress };
	// 		await updateDoc(docRef, updatedProgress);
			
		

	// 	} else {
	// 		const collectionRef = collection(db, 'progressBar')


	// 		await addDoc(collectionRef, {
	// 			userName: user.displayName,
	// 			user: user.uid,
	// 			progressBarNumber: progress,
	// 		})




	// 	};

	// }

	// const progressUpdate = async (e) => {
	// 	e.preventDefault(e);
	// 	if (progress?.hasOwnProperty("id")) {
	// 		alert('Please enter a valid food item');
	// 		return;
	// 	}
	// 	await addDoc(collection(db, 'progressBar'), {
	// 		user: user.uid,
	// 		progressNumber: progress
			
	// 	});
		
	// };






// /////////////////////////////////////////////////////////// //
// /////////////////////////////////////////////////////////// //
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
	{ level: 0, src: `${bronze}`, status: 'bronze' },
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


// level up progress bar
const handleLevelUp = async(e) => {
	setCurrentLevel(currentLevel + 1);
	setProgress(progress + 10);

	const docRef = doc(db, 'progressBar', progress.id, 'AknCONUnYZUNgCp4ps2b' );
			const updatedProgress = { progressBarNumber: progress };
			await updateDoc(docRef, updatedProgress);
};


// level down progress bar
const handleLevelDown = async(e) => {
	setCurrentLevel(currentLevel - 1);
	setProgress(progress - 10);

	const docRef = doc(db, 'progressBar', progress.id, 'AknCONUnYZUNgCp4ps2b' );
			const updatedProgress = { progressBarNumber: progress };
			await updateDoc(docRef, updatedProgress);
};
console.log(progress)
return (
	<div className="wrapper" >

		<div className="profile-top">

			<img src={user.photoURL} className="pfpdiv" />

			<div className="leftcontainer">
				<div className="displayname">{`Chef ${user.displayName}`}</div>

				<div className="profile-bar-div top">

					<GiForkKnifeSpoon style={{ paddingRight: "10px", paddingLeft: "0", color: '#f09133', fontSize: "25px" }} />{" "}
					<div>

						<progress value={progress} max="60"></progress>
					</div>
				</div></div>


		</div>

		{/* <button onClick={progressUpdate}>TESTUP</button> */}


		<div className="profile-bottom">
			{" "}
			<h2>Your Achievement</h2>
			<div className="achievement-image">
				{" "}
				<div>
					<img src={currentImage} alt={`Level ${currentLevel}`} />

					<h3>{`You're a ${currentLevel}-level cook!`}</h3>
				</div>
			</div>

		
			{/* the progress bar btn plus */}
			<button
			
				className='profile-btn'
				disabled={currentLevel === 7}
				onClick={handleLevelUp}>

				I cooked at home today!
			</button>


			{/* the progress bar btn minus */}
			<button

				className='profile-btn'
				disabled={currentLevel === 1}
				onClick={handleLevelDown}>
				Oops, no I didn't!
			</button>
			
			
		</div>
	</div>
);

}
export default Profile;

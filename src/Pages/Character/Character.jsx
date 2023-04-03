import { useState, useEffect } from 'react';
import './Character.css';
// import accessories from './CharacterAssets/accessories';
import { auth, storage, addUserAvatar } from '../../services/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';

function Character() {
	const [user, loading, error] = useAuthState(auth);
	const [modelUrls, setModelUrls] = useState([]);
	const [modelIndex, setModelIndex] = useState(0);
	const [skinToneUrls, setSkinToneUrls] = useState([]);
	const [accessoryUrls, setAccessoryUrls] = useState([]);
	const [accessoryIndex, setAccessoryIndex] = useState(0);
	const [hairUrls, setHairUrls] = useState([]);
	const [hairIndex, setHairIndex] = useState(0);
	const [pantUrls, setPantUrls] = useState([]);
	const [pantIndex, setPantIndex] = useState(0);
	const [shirtUrls, setShirtUrls] = useState([]);
	const [shirtIndex, setShirtIndex] = useState(0);
	const [shoeUrls, setShoeUrls] = useState([]);
	const [shoeIndex, setShoeIndex] = useState(0);

	// TODO 1) Start by loading First Model image 2) Display icon with each skin tone useState for index

	useEffect(() => {
		const fetchImages = async () => {
			const storageRef = ref(storage, '/images');
			const result = await listAll(storageRef);

			const urlPromises = result.items.map((imageRef) =>
				getDownloadURL(imageRef),
			);

			return Promise.all(urlPromises);
		};

		const loadImages = async () => {
			const urls = await fetchImages();

			setModelUrls(urls.filter((url) => url.includes('model')));
			setSkinToneUrls(urls.filter((url) => url.includes('skintone')));
			setAccessoryUrls(urls.filter((url) => url.includes('accessories')));
			setHairUrls(urls.filter((url) => url.includes('hair')));
			setPantUrls(urls.filter((url) => url.includes('pants')));
			setShirtUrls(urls.filter((url) => url.includes('shirt')));
			setShoeUrls(urls.filter((url) => url.includes('shoes')));
		};

		loadImages();
	}, []);

	const submitAvatar = async () => {
		let avatar = {
			avatarUrl: modelUrls[modelIndex],
			skinUrl: skinToneUrls[modelIndex],
			accessoryUrl: accessoryUrls[accessoryIndex],
			hairUrl: hairUrls[hairIndex],
			pantUrl: pantUrls[pantIndex],
			shirtUrls: shirtUrls[shirtIndex],
			shoeUrls: shoeUrls[shoeIndex],
		};

		await addUserAvatar(user, avatar);
	};

	return (
		<div>
			<h1>Design Your Character</h1>
			<div className='character-container'>
				<div className='character-wrapper'>
					<img
						className='model-img'
						src={modelUrls.length && modelUrls[modelIndex]}
						alt='default model'
					/>
					<img
						className='sel-hair'
						src={hairUrls.length && hairUrls[hairIndex]}
						alt='default hair'
					/>
					<img
						className='sel-accessory'
						src={accessoryUrls.length && accessoryUrls[accessoryIndex]}
						alt='default accessory'
					/>
					<img
						className='sel-shirt'
						src={shirtUrls.length && shirtUrls[shirtIndex]}
						alt='default shirt'
					/>
					<img
						className='sel-pants'
						src={pantUrls.length && pantUrls[pantIndex]}
						alt='default pants'
					/>
					<img
						className='sel-shoes'
						src={shoeUrls.length && shoeUrls[shoeIndex]}
						alt='default shoes'
					/>
				</div>
			</div>
			<div className='skintone-container'>
				{skinToneUrls.map((stUrl, i) => (
					<img
						key={`skintone-${i}`}
						className='skintone-img'
						src={stUrl}
						alt='skintone'
						onClick={() => setModelIndex(i)}
					/>
				))}
			</div>

			<div className='hair-container'>
				{hairUrls.map((hairUrl, i) => (
					<img
						key={`hair-${i}`}
						className='hair-img'
						src={hairUrl}
						alt='hair'
						onClick={() => setHairIndex(i)}
					/>
				))}
			</div>
			<div className='shirt-container'>
				{shirtUrls.map((shirtUrl, i) => (
					<img
						key={`shirt-${i}`}
						className='shirt-img'
						src={shirtUrl}
						alt='shirt'
						onClick={() => setShirtIndex(i)}
					/>
				))}
			</div>
			<div className='pants-container'>
				{pantUrls.map((pantUrl, i) => (
					<img
						key={`pants-${i}`}
						className='pants-img'
						src={pantUrl}
						alt='pants'
						onClick={() => setPantIndex(i)}
					/>
				))}
			</div>
			<div className='shoe-container'>
				{shoeUrls.map((shoeUrl, i) => (
					<img
						key={`shoes-${i}`}
						className='shoe-img'
						src={shoeUrl}
						alt='shoes'
						onClick={() => setShoeIndex(i)}
					/>
				))}
			</div>
			<div className='accessory-container'>
				{accessoryUrls.map((accUrl, i) => (
					<img
						key={`accessory-${i}`}
						className='accessory-img'
						src={accUrl}
						alt='accessory'
						onClick={() => setAccessoryIndex(i)}
					/>
				))}
			</div>
			<button className='submit-avatar' onClick={submitAvatar}>
				Submit
			</button>
		</div>
	);
}

export default Character;

import { useState, useEffect } from 'react';
import './Character.css';
// import accessories from './CharacterAssets/accessories';
import { storage } from '../../services/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

function Character() {
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

	return (
		<div>
			<h1>Design Your Character</h1>
			<div className='character-container'>
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
			<div className='hair-container'>
				{hairUrls.map((hUrl, i) => (
					<img
						key={`hair-${i}`}
						className='hair-img'
						src={hUrl}
						alt='hair'
						onClick={() => setHairIndex(i)}
					/>
				))}
			</div>
			{/* <div className='skintone-container'>
				{skinToneUrls.map((stUrl, i) => (
					<img
						key={`hair-${i}`}
						className='skin-tone-img'
						src={stUrl}
						alt='skin tone'
						onClick={() => setModelIndex(i)}
					/>
				))}
			</div> */}
			{/* <div className='skintone-container'>
				{skinToneUrls.map((stUrl, i) => (
					<img
						key={`hair-${i}`}
						className='skin-tone-img'
						src={stUrl}
						alt='skin tone'
						onClick={() => setModelIndex(i)}
					/>
				))}
			</div> */}
			{/* <div className='skintone-container'>
				{skinToneUrls.map((stUrl, i) => (
					<img
						key={`hair-${i}`}
						className='skin-tone-img'
						src={stUrl}
						alt='skin tone'
						onClick={() => setModelIndex(i)}
					/>
				))}
			</div> */}
		</div>
	);
}

export default Character;

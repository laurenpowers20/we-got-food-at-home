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
	const [hairUrls, setHairUrls] = useState([]);
	const [pantUrls, setPantUrls] = useState([]);
	const [shirtUrls, setShirtUrls] = useState([]);
	const [shoeUrls, setShoeUrls] = useState([]);

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
			<div>
				<img
					className='model-img'
					src={modelUrls.length && modelUrls[modelIndex]}
					alt='default model'
				/>
			</div>
			<div className='skintone-container'>
				{skinToneUrls.map((stUrl, i) => (
					<img
						key={`hair-${i}`}
						className='skintone-img'
						src={stUrl}
						alt='skin tone'
						onClick={() => setModelIndex(i)}
					/>
				))}
			</div>
			<div className='accessory-container'>
				{accessoryUrls.map((accUrl, i) => (
					<img
						// key={`hair-${i}`}
						className='accessory-img'
						src={accUrl}
						alt='accessory'
						// onClick={() => setModelIndex(i)}
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

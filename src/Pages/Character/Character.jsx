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

	// const [selectedModel, setSelectedModel] = useState(images.models.model1);
	// const [selectedSkin, setSelectedSkin] = useState(images.skintones.skintone1);
	// const [selectedHair, setSelectedHair] = useState(images.hair.hair1);
	// const [selectedShirt, setSelectedShirt] = useState(images.shirts.shirt1);
	// const [selectedPants, setSelectedPants] = useState(images.pants.pants1);
	// const [selectedShoes, setSelectedShoes] = useState(images.shoes.shoes1);
	// const [selectedAccessory, setSelectedAccessory] = useState(
	// 	images.accessories.none,
	// );

	// const models = [
	// 	{ id: 1, src: images.models.model1 },
	// 	{ id: 2, src: images.models.model2 },
	// 	{ id: 3, src: images.models.model3 },
	// 	{ id: 4, src: images.models.model4 },
	// ];

	// const skintones = [
	// 	{ id: 1, src: images.skintones.skintone1 },
	// 	{ id: 2, src: images.skintones.skintone2 },
	// 	{ id: 3, src: images.skintones.skintone3 },
	// 	{ id: 4, src: images.skintones.skintone4 },
	// ];

	// const hair = [
	// 	{ id: 1, src: images.hair.hair1 },
	// 	{ id: 2, src: images.hair.hair2 },
	// 	{ id: 3, src: images.hair.hair3 },
	// 	{ id: 4, src: images.hair.hair4 },
	// ];

	// const shirts = [
	// 	{ id: 1, src: images.shirts.shirt1 },
	// 	{ id: 2, src: images.shirts.shirt2 },
	// 	{ id: 3, src: images.shirts.shirt3 },
	// 	{ id: 4, src: images.shirts.shirt4 },
	// ];

	// const pants = [
	// 	{ id: 1, src: images.pants.pants1.png },
	// 	{ id: 2, src: images.pants.pants2.png },
	// 	{ id: 3, src: images.pants.pants3.png },
	// 	{ id: 4, src: images.pants.pants4.png },
	// ];

	// const shoes = [
	// 	{ id: 1, src: images.shoes.shoes1.png },
	// 	{ id: 2, src: images.shoes.shoes2.png },
	// 	{ id: 3, src: images.shoes.shoes3.png },
	// 	{ id: 4, src: images.shoes.shoes4.png },
	// ];

	// const accessories = [
	// 	{ id: 1, src: images.accessories.accessories1.png },
	// 	{ id: 2, src: images.accessories.accessories2.png },
	// 	{ id: 3, src: images.accessories.accessories3.png },
	// ];

	// const handleModelChange = (e) => {
	// 	setSelectedModel(e.target.src);
	// };

	// const handleSkinChange = (e) => {
	// 	setSelectedSkin(e.target.src);
	// };

	// const handleHairChange = (e) => {
	// 	setSelectedHair(e.target.src);
	// };

	// const handleShirtChange = (e) => {
	// 	setSelectedShirt(e.target.src);
	// };

	// const handlePantsChange = (e) => {
	// 	setSelectedPants(e.target.src);
	// };

	// const handleShoesChange = (e) => {
	// 	setSelectedShoes(e.target.src);
	// };

	// const handleAccessoryChange = (e) => {
	// 	setSelectedAccessory(e.target.src);
	// };

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
			<div>
				{skinToneUrls.map((stUrl, i) => (
					<img
						key={`hair-${i}`}
						className='skin-tone-img'
						src={stUrl}
						alt='skin tone'
						onClick={() => setModelIndex(i)}
					/>
				))}
			</div>
			{/* <h1>Dress Up Game</h1>
			<div className='model-selection'>
				<h2>Select Model</h2>
				<div className='models'>
					{models.map((model) => (
						<img
							key={model.id}
							src={model.src}
							alt={`Model ${model.id}`}
							className={selectedModel === model.src ? 'selected' : ''}
							onClick={handleModelChange}
						/>
					))}
				</div>
			</div>
			<div className='outfit-selection'>
				<h2>Select Outfit</h2>
				<div className='outfit-section'>
					<h3>Skin Tone</h3>
					<div className='skintones'>
						{skintones.map((skin) => (
							<img
								key={skin.id}
								src={skin.src}
								alt={`Skin ${skin.id}`}
								className={selectedSkin === skin.src ? 'selected' : ''}
								onClick={handleSkinChange}
							/>
						))}
					</div>
				</div>
				<div className='outfit-section'>
					<h3>Hair Style</h3>
					<div className='hair-styles'>
						{hair.map((hair) => (
							<img
								key={hair.id}
								src={hair.src}
								alt={`Hair ${hair.id}`}
								className={selectedHair === hair.src ? 'selected' : ''}
								onClick={handleHairChange}
							/>
						))}
					</div>
				</div>
				<div className='outfit-section'>
					<h3>Shirt</h3>
					<div className='shirts'>
						{shirts.map((shirt) => (
							<img
								key={shirt.id}
								src={shirt.src}
								alt={`Shirt ${shirt.id}`}
								className={selectedShirt === shirt.src ? 'selected' : ''}
								onClick={handleShirtChange}
							/>
						))}
					</div>
				</div>
				<div className='outfit-section'>
					<h3>Pants</h3>
					<div className='pants'>
						{pants.map((pant) => (
							<img
								key={pant.id}
								src={pant.src}
								alt={`Pants ${pant.id}`}
								className={selectedPants === pant.src ? 'selected' : ''}
								onClick={handlePantsChange}
							/>
						))}
					</div>
				</div>
				<div className='outfit-section'>
					<h3>Shoes</h3>
					<div className='shoes'>
						{shoes.map((shoe) => (
							<img
								key={shoe.id}
								src={shoe.src}
								alt={`Shoes ${shoe.id}`}
								className={selectedShoes === shoe.src ? 'selected' : ''}
								onClick={handleShoesChange}
							/>
						))}
					</div>
				</div>
				<div className='outfit-section'>
					<h3>Accessories</h3>
					<div className='accessories'>
						{accessories.map((accessory) => (
							<img
								key={accessory.id}
								src={accessory.src}
								alt={`Accessory ${accessory.id}`}
								className={
									selectedAccessory === accessory.src ? 'selected' : ''
								}
								onClick={handleAccessoryChange}
							/>
						))}
					</div>
				</div>
			</div>
			<div className='model-display'>
				<h2>Model Preview</h2>
				<div className='preview'>
					<img src={selectedModel} alt='Selected Model' />
					<img src={selectedSkin} alt='Selected Skin' />
					<img src={selectedHair} alt='Selected Hair' />
					<img src={selectedShirt} alt='Selected Shirt' />
					<img src={selectedPants} alt='Selected Pants' />
					<img src={selectedShoes} alt='Selected Shoes' />
					<img src={selectedAccessory} alt='Selected Accessory' />
				</div>
			</div> */}
		</div>
	);
}

export default Character;

import React, { useState } from 'react';
import './DressUpGame.css';

const CharacterCustomizer = () => {
	const [selectedAvatar, setSelectedAvatar] = useState('/avatars/avatar1.png');
	const [selectedSkin, setSelectedSkin] = useState('/skins/skin1.png');
	const [selectedHair, setSelectedHair] = useState('/hair/hair1.png');
	const [selectedShirt, setSelectedShirt] = useState('/clothes/shirt1.png');
	const [selectedPants, setSelectedPants] = useState('/clothes/pants1.png');
	const [selectedShoes, setSelectedShoes] = useState('/shoes/shoes1.png');
	const [selectedAccessory, setSelectedAccessory] = useState(
		'/accessories/accessory1.png',
	);

	const avatars = [
		{ id: 1, src: '/avatars/avatar1.png' },
		{ id: 2, src: '/avatars/avatar2.png' },
		{ id: 3, src: '/avatars/avatar3.png' },
		{ id: 4, src: '/avatars/avatar4.png' },
	];

	const skins = [
		{ id: 1, src: '/skins/skin1.png' },
		{ id: 2, src: '/skins/skin2.png' },
		{ id: 3, src: '/skins/skin3.png' },
		{ id: 4, src: '/skins/skin4.png' },
	];

	const hairStyles = [
		{ id: 1, src: '/hair/hair1.png' },
		{ id: 2, src: '/hair/hair2.png' },
		{ id: 3, src: '/hair/hair3.png' },
		{ id: 4, src: '/hair/hair4.png' },
	];

	const shirts = [
		{ id: 1, src: '/clothes/shirt1.png' },
		{ id: 2, src: '/clothes/shirt2.png' },
		{ id: 3, src: '/clothes/shirt3.png' },
		{ id: 4, src: '/clothes/shirt4.png' },
	];

	const pants = [
		{ id: 1, src: '/clothes/pants1.png' },
		{ id: 2, src: '/clothes/pants2.png' },
		{ id: 3, src: '/clothes/pants3.png' },
		{ id: 4, src: '/clothes/pants4.png' },
	];

	const shoes = [
		{ id: 1, src: '/shoes/shoes1.png' },
		{ id: 2, src: '/shoes/shoes2.png' },
		{ id: 3, src: '/shoes/shoes3.png' },
		{ id: 4, src: '/shoes/shoes4.png' },
	];

	const accessories = [
		{ id: 1, src: '/accessories/accessory1.png' },
		{ id: 2, src: '/accessories/accessory2.png' },
		{ id: 3, src: '/accessories/accessory3.png' },
		{ id: 4, src: '/accessories/accessory4.png' },
	];

	const handleAvatarChange = (e) => {
		setSelectedAvatar(e.target.src);
	};

	const handleSkinChange = (e) => {
		setSelectedSkin(e.target.src);
	};

	const handleHairChange = (e) => {
		setSelectedHair(e.target.src);
	};

	const handleShirtChange = (e) => {
		setSelectedShirt(e.target.src);
	};

	const handlePantsChange = (e) => {
		setSelectedPants(e.target.src);
	};

	const handleShoesChange = (e) => {
		setSelectedShoes(e.target.src);
	};

	const handleAccessoryChange = (e) => {
		setSelectedAccessory(e.target.src);
	};

	return (
		<div className='container'>
			<h1>Dress Up Game</h1>
			<div className='avatar-selection'>
				<h2>Select Avatar</h2>
				<div className='avatars'>
					{avatars.map((avatar) => (
						<img
							key={avatar.id}
							src={avatar.src}
							alt={`Avatar ${avatar.id}`}
							className={selectedAvatar === avatar.src ? 'selected' : ''}
							onClick={handleAvatarChange}
						/>
					))}
				</div>
			</div>
			<div className='outfit-selection'>
				<h2>Select Outfit</h2>
				<div className='outfit-section'>
					<h3>Skin Tone</h3>
					<div className='skins'>
						{skins.map((skin) => (
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
						{hairStyles.map((hair) => (
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
			<div className='avatar-display'>
				<h2>Avatar Preview</h2>
				<div className='preview'>
					<img src={selectedAvatar} alt='Selected Avatar' />
					<img src={selectedSkin} alt='Selected Skin' />
					<img src={selectedHair} alt='Selected Hair' />
					<img src={selectedShirt} alt='Selected Shirt' />
					<img src={selectedPants} alt='Selected Pants' />
					<img src={selectedShoes} alt='Selected Shoes' />
					<img src={selectedAccessory} alt='Selected Accessory' />
				</div>
			</div>
		</div>
	);
};

export default CharacterCustomizer;

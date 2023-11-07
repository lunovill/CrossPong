import { FC, useEffect } from 'react';
import { generateRandomUsername } from './Utils';

const listImgProfil = [
	'/images/profilPicture/church2.png',
	'/images/profilPicture/church1.png',
	'/images/profilPicture/church3.png',
	'/images/profilPicture/church4.png',
	'/images/profilPicture/cowboy1.png',
	'/images/profilPicture/cowboy2.png',
	'/images/profilPicture/cowboy3.png',
	'/images/profilPicture/cowboy4.png',
	'/images/profilPicture/medieval1.png',
	'/images/profilPicture/medieval2.png',
	'/images/profilPicture/medieval3.png',
	'/images/profilPicture/medieval4.png',
	'/images/profilPicture/ninja1.png',
	'/images/profilPicture/ninja2.png',
	'/images/profilPicture/ninja3.png',
	'/images/profilPicture/ninja4.png'
];

export const initializeSessionStorage = () => {
	let storedPseudo = sessionStorage.getItem('pseudo');
	let storedProfilePic = sessionStorage.getItem('profilePic');

	if (!storedPseudo) {
		storedPseudo = generateRandomUsername();
		sessionStorage.setItem('pseudo', storedPseudo);
	}

	if (!storedProfilePic) {
		const randomIndex = Math.floor(Math.random() * listImgProfil.length);
		storedProfilePic = listImgProfil[randomIndex];
		sessionStorage.setItem('profilePic', storedProfilePic);
	}
};

const CheckInfoSessionStorage = () => {

	useEffect(() => {
		initializeSessionStorage();
	}, []);

	return (
		<>
		</>
	);
};

export default CheckInfoSessionStorage;

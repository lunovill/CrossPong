import styled from 'styled-components';
import { StyledImage } from './ProfileStyle';

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

const PicturesContainers = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: center;
`;


type Props = {
	handleSelectedImage: (image: string) => void;
	selectedImage: string;
}

const DefaultPhoto = ({handleSelectedImage, selectedImage}: Props) => {
	return (
		<PicturesContainers>
			{listImgProfil.map((image, index) => (
				<StyledImage key={index} onClick={() => handleSelectedImage(image)}
					src={image} alt="Profile picture"
					$isSelected={selectedImage === image} />
			))}
		</PicturesContainers>
	)
}

export default DefaultPhoto
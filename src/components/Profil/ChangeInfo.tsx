import { useState, ChangeEvent, useEffect } from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { generateRandomUsername } from './Utils';
import { WrittingContainer, StyledButton } from './ProfileStyle';
import DefaultPhoto from './DefaultPhoto';

const Dialog = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	z-index: 100;
	transform: translate(-50%, -50%);
	background-color: #516999;
	border: 1px solid #000000;
	border-radius: 5px;
	width: 800px;
	padding: 20px;
	display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
`;

const CloseButton = styled.div`
    position: absolute;
    top: 5px;
    right: 0px;
    background-color: transparent;
    cursor: pointer;
    text-align: center;
    height: 40px;
    width: 40px;
    font-size: 35px;
    color: #7c0404;
    font-weight: 700;
    font-family: 'Yoster', cursive;

    &:hover {
        color: #0f0a0a;
    }
`;

const StyledSVG = styled.svg`
	position:absolute;
	top: 20px;
	right: 10px;
	width: 30px;
	height: 30px;
`;

interface SvgProps {
	onClick: () => void;
	onFirstUpdate?: boolean;
}

const SvgUpdateProfile: FC<SvgProps> = ({ onClick }: SvgProps) => {
	return (
		<StyledSVG onClick={onClick} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				<rect width="48" height="48" fill="white" fillOpacity="0.01"></rect>
				<path d="M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
				<path d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z" fill="#c49f28" stroke="#000000" strokeWidth="4" strokeLinejoin="round"></path>
			</g>
		</StyledSVG>
	);
};

const StyledInput = styled.input`
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #c49f28;
    border-radius: 4px;
    outline: none;

  &:focus {
    border-color: blue;
  }
`;


interface UpdateInfoProps {
	name: string | null;

}
const UpdateInfo: FC<UpdateInfoProps> = ({ name }) => {
	const [showDialog, setShowDialog] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [newPseudo, setNewPseudo] = useState<string>("");

	useEffect(() => {
		if (newPseudo === "") {

			if (name == null)
				setNewPseudo(generateRandomUsername());
			else
				setNewPseudo(name);
		}
	}, []);

	const handleChangePseudo = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length < 13)
			setNewPseudo(e.target.value.replace(/\s+/g, ''));
	};
	
	const handleSubmitPseudo =() => {
		sessionStorage.setItem('pseudo', newPseudo);	
		setNewPseudo("");

	};

	{/* handler */ }

	const handleOpenDialog = () => {
		setShowDialog(true);
	}



	const handleSelectedImage = (imageName: string) => {
		setSelectedImage(imageName);
	};


	const handleImageClick = () => {
		console.log(selectedImage);
		if (selectedImage)
			sessionStorage.setItem('profilePic', selectedImage);
	};

	const closeDialog = () => {
		setShowDialog(false);
		setSelectedImage(null);
	}

	return (
		<>
			{(showDialog) && (
				<Dialog>
					{/* Close button // First time message*/}
					{
						<CloseButton onClick={closeDialog}>x
						</CloseButton>
					}
					<> 
					{/* Picture */}
						<WrittingContainer $size="12px" $weight="700" color="#000000">Select Your Profile Picture</WrittingContainer>
						<DefaultPhoto handleSelectedImage={handleSelectedImage} selectedImage={selectedImage as string} />
						{/* Confirm Button */}
						{(selectedImage ?
							<StyledButton onClick={handleImageClick}>Confirm Image Selection</StyledButton>
							:
							<StyledButton disabled> Please Select an Image</StyledButton>)}
					</>
					<>
						{/* Pseudo */}
						<WrittingContainer $size="14px" $weight="700" $color="#000000">
							Select Your New UserName
						</WrittingContainer>
						<StyledInput
							type="text"
							value={newPseudo}
							onChange={handleChangePseudo}
						/>
						{/* Confirm Button */}
						{
							((name === newPseudo  || newPseudo === "") ?
								<StyledButton disabled>
									Please Update Your Pseudo
								</StyledButton> :
								<StyledButton onClick={handleSubmitPseudo}>
									Confirm New Pseudo
								</StyledButton>)
						}
					</>
				</Dialog>
			)}
			{<SvgUpdateProfile onClick={handleOpenDialog} />}
		</>
	)
}

export default UpdateInfo;
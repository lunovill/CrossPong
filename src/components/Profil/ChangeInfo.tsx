import { useState, ChangeEvent, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useUserInfos } from '../ContextBoard';
import { generateRandomUsername } from './Utils';
import { updatePlayerPhotoApi, updatePlayerPseudoApi } from './FetchApi';
import { StyledImage, WrittingContainer, StyledButton } from './ProfileStyle';
import DefaultPhoto from './DefaultPhoto';
import { useNavigate } from 'react-router-dom';

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

const SvgUpdateProfile: React.FC<SvgProps> = ({ onClick }: SvgProps) => {
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

interface StyledSvgReloadPictureProps {
	$onFirstUpdate?: boolean;
}
const StyledSVGReloadPicture = styled.svg<StyledSvgReloadPictureProps>`
    position:absolute;
    top: ${props => props.$onFirstUpdate ? '370px' : '300px'};
    right: 335px;

    fill: #ffffff;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out, fill 0.3s ease-in-out;

  &:hover {
    transform: rotate(200deg);
    fill: black;
  }
`;

const SvgReloadPicture: React.FC<SvgProps> = ({ onClick, onFirstUpdate = false }) => {
	return (
		<StyledSVGReloadPicture onClick={onClick} $onFirstUpdate={onFirstUpdate} viewBox="0 0 24.00 24.00" id="update-alt" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" className="icon flat-line">
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				<path id="primary" d="M5.07,8A8,8,0,0,1,20,12" style={{ fill: "none", stroke: "#c49f28", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }}></path>
				<path id="primary-2" data-name="primary" d="M18.93,16A8,8,0,0,1,4,12" style={{ fill: "none", stroke: "#c49f28", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }}></path>
				<polyline id="primary-3" data-name="primary" points="5 3 5 8 10 8" style={{ fill: "none", stroke: "#c49f28", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }}></polyline>
				<polyline id="primary-4" data-name="primary" points="19 21 19 16 14 16" style={{ fill: "none", stroke: "#c49f28", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }}></polyline>
			</g>
		</StyledSVGReloadPicture>
	);
}

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

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
	position: relative;
	width: 75px;
	height: 75px;
	margin: 5px;
	border-radius: 5%;
	overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 55px; 
    height: 55px; 
    margin-top: -27.5px; 
    margin-left: -27.5px;
    border: 2px solid transparent;
    border-top-color: #000;
    border-left-color: #000;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
  }
`;

interface UpdateInfoProps {
	name: string | null;
	onFirstUpdate?: boolean;
}
const UpdateInfo: React.FC<UpdateInfoProps> = ({ name, onFirstUpdate = false }) => {
	const [showDialog, setShowDialog] = useState(false);
	const { setUserInfo, setIsConnected, setNeedToReload } = useUserInfos();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
	const [errorPhoto, setErrorPhoto] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [newPseudo, setNewPseudo] = useState<string>("");
	const [errorPseudo, setErrorPseudo] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (newPseudo === "") {

			if (name == null)
				setNewPseudo(generateRandomUsername());
			else
				setNewPseudo(name);
		}
	}, []);

	const handleChangePseudo = (e: ChangeEvent<HTMLInputElement>) => {
		setNewPseudo(e.target.value.replace(/\s+/g, ''));
	};

	const handleSubmitPseudo = async () => {
		try {
			const data = await updatePlayerPseudoApi(newPseudo!);
			setUserInfo({ pseudo: data.pseudo.pseudo, urlPhoto: data.pseudo.urlPhotoProfile });
			if (onFirstUpdate)
				navigate('/');
			else
				closeDialog();
		} catch (error: any) {
			if (error && (error.statusCode === 401 || error.statusCode === 403)) {
				setIsConnected(false);
				setNeedToReload(true);
			}
			if (typeof error === 'object' && error !== null && 'message' in error) {
				const errorMessage = (error as { message: string }).message;
				setErrorPseudo(errorMessage);
			} else {
				setErrorPseudo("Une erreur est survenue");
			}
		}
	};

	{/* handler */ }

	const handlerFirstUpdate = () => {
		handleImageClick();
		handleSubmitPseudo();
	}
	const handleOpenDialog = () => {
		setShowDialog(true);
	}

	const handleImageClickOrOpenPicker = () => {
		if (imageSrc)
			handleSelectedImage("Uploaded");
		else if (fileInputRef.current)
			fileInputRef.current.click();
	};

	const handleSelectedImage = (imageName: string) => {
		setErrorPhoto(null);
		setSelectedImage(imageName);
	};

	const handleChangeImage = () => {
		setImageSrc(null);
		setErrorPhoto(null);
		setIsLoading(false);
		setErrorPseudo(null);
		if (selectedImage === "Uploaded") {
			setSelectedImage(null);
		}
	};

	const handleImageClick = () => {
		if (selectedImage === "Uploaded")
			changeUrlOnTheBack(imageSrc as string);
		else
			changeUrlOnTheBack(selectedImage!);
		if (!onFirstUpdate)
			closeDialog();
	};

	const closeDialog = () => {
		setShowDialog(false);
		setSelectedImage(null);
		setImageSrc(null);
		setErrorPseudo(null);
		setErrorPhoto(null);
	}

	const handleOnChange = async (changeEvent: ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();

		reader.onload = async function (onLoadEvent: ProgressEvent<FileReader>) {
			if (onLoadEvent.target) {
				// Simuler un événement de formulaire
				const fakeEvent = {
					currentTarget: {
						elements: [{ name: 'file', files: changeEvent.target.files }]
					},
					preventDefault: () => { }
				} as unknown as React.FormEvent<HTMLFormElement>;
				await handleUploadedOnSubmit(fakeEvent);
			}
		};
		changeEvent.target.files && reader.readAsDataURL(changeEvent.target.files[0]);
	};

	{/* async function to Patch */ }

	async function handleUploadedOnSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const form = event.currentTarget;
		const fileInput = (Array.from(form.elements) as HTMLInputElement[]).find(({ name }) => name === 'file');
		const formData = new FormData();
		if (!fileInput?.files) throw new Error('File input not found');
		for (const file of fileInput.files) {
			formData.append('file', file);
			formData.append('upload_preset', 'yrwbuucd');
		}

		formData.append('upload_preset', 'ml_default');
		let urlFetch = 'https://api.cloudinary.com/v1_1/deqpv1hlh/image/upload'; //mettre dans env

		const cloudinaryResponse = await fetch(urlFetch, {
			method: 'POST',
			body: formData
		});

		const cloudinaryData = await cloudinaryResponse.json();
		if (cloudinaryData.secure_url) {
			setErrorPhoto(null);
			setImageSrc(cloudinaryData.secure_url);
			handleSelectedImage("Uploaded");
		} else {
			setErrorPhoto('Seules les images sont autorisées pour l\'upload et la taille du fichier doit être inférieure à 10 MB."');
		}
		setIsLoading(false);
	}

	const changeUrlOnTheBack = async (newPic: string) => {
		try {
			const data = await updatePlayerPhotoApi(newPic);
			setUserInfo({ pseudo: data.updatedPlayer.pseudo, urlPhoto: data.updatedPlayer.urlPhotoProfile });
		} catch (error: any) {
			if (error && (error.statusCode === 401 || error.statusCode === 403)) {
				setIsConnected(false);
				setNeedToReload(true);
			}
			if (typeof error === 'object' && error !== null && 'message' in error) {
				const errorMessage = (error as { message: string }).message;
				console.log(errorMessage);
			} else
				console.log("Une erreur est survenue");
		}
	};

	return (
		<>
			{(showDialog || onFirstUpdate) && (
				<Dialog>
					{/* Close button // First time message*/}
					{!onFirstUpdate ?
						<CloseButton onClick={closeDialog}>x
						</CloseButton> :
						<WrittingContainer $size="20px" $weight="700" color="#e4d6d6">Please complete your personal information to proceed.</WrittingContainer>}
					<> {/* Picture */}
						{/* Default Picture */}
						<WrittingContainer $size="12px" $weight="700" color="#000000">Select Your Profile Picture</WrittingContainer>
						<DefaultPhoto handleSelectedImage={handleSelectedImage} selectedImage={selectedImage as string} />

						{/* Upload Picture */}
						<WrittingContainer $size="12px" $weight="700" color="#000000">Or Upload Your Own Image</WrittingContainer>
						{errorPhoto && <WrittingContainer $size="12px" $weight="700" $color="#9e0b0b">{errorPhoto}</WrittingContainer>}
						{imageSrc && <SvgReloadPicture onClick={handleChangeImage} onFirstUpdate={onFirstUpdate && true} />}
						{isLoading ? (
							<LoadingContainer />
						) : (
							<StyledImage
								src={imageSrc ? imageSrc as string : `/images/profilPicture/uploadedPicture.png`}
								onClick={imageSrc === null ? handleImageClickOrOpenPicker : () => handleSelectedImage("Uploaded")}
								$isSelected={selectedImage === "Uploaded"}
								alt="Profile picture"
							/>
						)}
						<input type="file" ref={fileInputRef} onChange={handleOnChange} style={{ display: 'none' }} />
						{/* Confirm Button */}
						{!onFirstUpdate && (selectedImage ?
							<StyledButton onClick={handleImageClick}>Confirm Image Selection</StyledButton>
							:
							<StyledButton disabled> Please Select an Image</StyledButton>)}
					</>
					<> {/* Pseudo */}
						<WrittingContainer $size="14px" $weight="700" $color="#000000">
							Select Your New UserName
						</WrittingContainer>
						<StyledInput
							type="text"
							value={newPseudo}
							onChange={handleChangePseudo}
						/>
						{/* Confirm Button */}
						{!onFirstUpdate && (name === newPseudo ?
							<StyledButton disabled>
								Please Update Your Pseudo
							</StyledButton> :
							<StyledButton onClick={handleSubmitPseudo}>
								Confirm New Pseudo
							</StyledButton>)
						}
						{errorPseudo && <div>{errorPseudo}</div>}
						{onFirstUpdate && ((selectedImage && newPseudo) ?
							<StyledButton onClick={handlerFirstUpdate}>Submit Information</StyledButton>
							:
							<StyledButton disabled>Complete Fields to Submit</StyledButton>)}
					</>

				</Dialog>
			)}
			{!onFirstUpdate && <SvgUpdateProfile onClick={handleOpenDialog} />}
		</>
	)
}

export default UpdateInfo;
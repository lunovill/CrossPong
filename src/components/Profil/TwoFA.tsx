import { useEffect, useState } from 'react';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { StyledButton } from './ProfileStyle';
import { useUserInfos } from '../ContextBoard';
import { WrittingContainer } from './ProfileStyle';

interface TwoFaProps {
	isInTheLobby?: boolean;
	handle2FAActivation: () => void;
}

interface Container2FAProps {
	$isInLobby?: boolean;
}

const Container2FA = styled.div<Container2FAProps>`
	position: absolute;
	top: ${props => props.$isInLobby ? '510px' : '50px'};
	width: 295px;
	height: ${props => props.$isInLobby ? '400px' : '540px'}; 
	display: flex;
	border-radius: 1%;
	
	flex-direction: column;
	align-items: center;
	background-color: #955DDE;
	box-shadow: ${props => props.$isInLobby ? '4px 4px 14px rgba(0, 0, 0, 0.5);' : ''};
`;

const QrImg = styled.img<Container2FAProps>`
	margin-top: ${props => props.$isInLobby ? '10px' : '50px'};
	width: ${props => props.$isInLobby ? '150px' : '200px'};
	height: ${props => props.$isInLobby ? '150px' : '200px'};
`;

interface DecodedToken {
	sub: string;
}

const InputField = styled.input`
  padding: 10px;
  margin: 20px;
  border: 1px solid #ccc;
  width: 250px;
  height: 40px;
  border-radius: 4px;
`;

export const TwoFA: React.FC<TwoFaProps> = ({ isInTheLobby = false, handle2FAActivation }) => {
	const { setIsConnected, setNeedToReload, setIs2FAActive
	} = useUserInfos();
	const [code, setCode] = useState<string | undefined>(undefined);
	const [inputCode, setInputCode] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		generateAQr();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputCode(e.target.value);
	};

	const generateAQr = async () => {
		try {

			const token = document.cookie.split('; ').find(row => row.startsWith('jwt_token='))?.split('=')[1];

			if (!token) throw new Error('Token is not available');
			const decodedToken = jwt_decode(token) as DecodedToken;
			const userId = decodedToken.sub;
			await axios.post(`${import.meta.env['VITE_API_URL']}/2fa/generate`,
				JSON.stringify({ id: userId }), // Corps de la requête
				{
					headers: {
						'Content-Type': 'application/json', // Assurez-vous de définir le bon type de contenu
					},
					withCredentials: true, // Pour inclure les cookies dans la requête
				}
			).then(response => {
				setCode(response.data.qrCodeDataUrl);
			});

		} catch (error: any) {
			if (error.response && (error.response.status === 401 || error.response.status === 403)) {
				setIsConnected(false);
				setNeedToReload(true);
			}
		}
	}

	const verifyCode = async (code: string) => {

		let response;
		try {
			response = await axios.post(
				`${import.meta.env['VITE_API_URL']}/2fa/turn-on`,
				JSON.stringify({ twoFactorAuthenticationCode: code }),
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);

			if (isInTheLobby) {
			}

			setIs2FAActive(true);
			handle2FAActivation();
			setInputCode('');

		} catch (error: any) {
			if (error.response && (error.response.status === 401 || error.response.status === 403)) {
				setIsConnected(false);
				setNeedToReload(true);
			}
			else {
				setErrorMessage(error.response?.data?.message || "Unknown error");
			}
		}
	};

	return (
		<>
			<Container2FA $isInLobby={isInTheLobby}>
				<WrittingContainer $size='20px'>
					{isInTheLobby ? '2FA Authentication' : '2FA Activation'}
				</WrittingContainer>
				<QrImg src={code} alt="qrcode" $isInLobby={isInTheLobby} />
				<>
					<InputField
						type="text"
						value={inputCode}
						onChange={handleInputChange}
						placeholder="Enter your 2FA code"
					/>
					{errorMessage &&
						<p style={{
								color: '#491d1d',
								fontSize: '12px',
								marginBottom: '10px'
							}}>
							{errorMessage}</p>}
					<StyledButton
						$fontSize='16px'
						onClick={() => verifyCode(inputCode)}>Verify Code</StyledButton>
				</>
			</Container2FA>
		</>
	);
};

export default TwoFA;
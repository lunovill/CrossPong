import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useUserInfos } from '../ContextBoard';
import PopUpTwoFA from './TwoFaPopUp';
import TwoFA from './TwoFA';

interface ToggleProps {
	$active: boolean;
}

const ToggleContainer = styled.div<ToggleProps>`
	width: 37.5px;
	height: 18px;
	margin-top: 30px;
	margin-left: 8px;
	background-color: ${props => props.$active ? '#4CAF50' : '#ccc'};
	border-radius: 12px;
	position: relative;
	cursor: pointer;
  `;

const ToggleCircle = styled.div<ToggleProps>`
	width: 18px;
	height: 18px;
	background-color: white;
	border-radius: 50%;
	position: absolute;
	top: 0;
	left: ${props => props.$active ? '20px' : '0'};
	transition: left 0.2s ease-in-out;
  `;

const TWOFaImg = styled.img`
	width: 40px;
	height: 40px;
	margin-left: -3px;
	border-radius: 5%;
	object-fit: cover;
	margin-top: 20px;
	margin-bottom: 5px;
`;

const TwoFaContainer = styled.div`
	position: absolute;
	top: 575px;
	display: flex;
	flex-direction: row;
`;

export const TwoFAToggle: React.FC = () => {
	const { is2FAActive, setIs2FAActive } = useUserInfos();
	const [isActive, setIsActive] = useState(false);
	const [popUp, setPopUp] = useState(false);

	const handle2FAActivation = () => {
		setPopUp(true);
		setTimeout(() => {
			setPopUp(false);
		}, 3000);
	};

	const disable2fa = async () => {
		try {
			const response = await axios.patch(
				`${import.meta.env['VITE_API_URL']}/2fa/users`,
				{},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			if (response.data.statusCode === 200) {
				console.log(response.data.message);
			} else {
				console.error(response.data.message);
			}
		} catch (error) {
			console.error('There was a problem with the request:', error);
		}

	};

	const handleToggle = () => {
		const newState = !isActive;
		setIsActive(newState);
		if (is2FAActive === true) {
			handle2FAActivation();
			setIsActive(false);
			setIs2FAActive(false);
			disable2fa();
		}
	};

	return (
		<>
			<PopUpTwoFA message={is2FAActive ? "Two-Factor Authentication has been successfully activated." : "Two-Factor Authentication has been successfully deactivated."} isVisible={popUp} />
			<TwoFaContainer>
				<TWOFaImg src="/UI/2fa.png" alt="2FA" />
				<ToggleContainer $active={isActive || (is2FAActive === true)} onClick={handleToggle}>
					<ToggleCircle $active={isActive || (is2FAActive === true)} />
				</ToggleContainer>
			</TwoFaContainer>
			{(isActive && !is2FAActive) && <TwoFA handle2FAActivation={handle2FAActivation} />}
		</>
	);
};
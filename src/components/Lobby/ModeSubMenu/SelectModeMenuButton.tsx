import styled, { css } from 'styled-components';
import { PixelCorners3x3 } from '../../../styles/HomeStyles';
import Pixelated_Button from '../../Global_UI/Pixelated_Button';
import { useEffect, useRef, useState } from 'react';
import { ModeType } from '../../../types/machine.type';
import { useGame } from '../../../game/hooks/useGame';
import { set } from 'math/vec2';

interface ButtonProps {
	$expanded: number;
	$isClicked?: string;
}

const MenuButtonContainer = styled(PixelCorners3x3) <ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 468px;
  height: 76px;
  margin: 10px;
  z-index: 8;
  background-color:  #000000;
  transition: background-color 2s ease,
              width 1s ease,
              height 1s ease,
              transform 0.6s ease 0.4s;
  ${props => (props.$expanded != -1) && css`
  		position: absolute;	
		transform: translate(0%, calc((66.666% - 564px)));
		width: 544px;
		height: 566px;
      	background-color: #FFF8DC;
  `}
`;

const MenuButtonContainerAnimation = styled(PixelCorners3x3) <ButtonProps>`
	position: absolute;
	width: 468px;
	height: 76px;
	margin: 10px;
	z-index: 8;
	background-color:  #000000;
	transition: background-color 2s ease,
              width 1s ease,
              height 1s ease,
              transform 0.6s ease 0.4s;
  ${props => (props.$expanded != -1) && css`
  		position: absolute;	
		transform: translate(0%, calc((66.666% - 564px)));
		width: 544px;
		height: 566px;
      	background-color: #FFF8DC;
  `}
`;


type Props = {
	label: string;
	modeValue: ModeType;
	setExpanded: (expanded: number) => void;
	expanded: number;
	$backgroundColor: string;
	$key: number;
};

const MenuButton: React.FC<Props> = ({ label, modeValue, $backgroundColor, $key, setExpanded, expanded }) => {
	const { send } = useGame();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (expanded === $key) {
			setTimeout(() => {
				handleTransitionEnd();
			}, 1000);
		}
	}
		, [expanded]);

	const handleTransitionEnd = () => {
		send({ type: 'join', id: 'j1', name: 'Player' });
		send({ type: 'join', id: 'j2', name: 'Bot' });
		send({ type: 'chooseMode', mode: modeValue });
	};

	const handleButtonClick = () => {
		setExpanded($key); // Déclencher l'animation d'expansion
	};

	return (
		<>
			{
				(expanded === -1 || expanded === $key) && // Si le bouton n'est pas étendu

				<MenuButtonContainer
					$expanded={expanded}
					ref={containerRef}
				>
					{(expanded === -1) &&
						<Pixelated_Button
							color_button={$backgroundColor}
							text={label}
							font_size={'24px'}
							onClick={handleButtonClick}
						/>}
				</MenuButtonContainer>
			}
		</>
	);
};

export default MenuButton;
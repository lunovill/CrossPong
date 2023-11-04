import styled, { css } from 'styled-components';
import { PixelCorners3x3 } from '../../../styles/HomeStyles';
import Pixelated_Button from '../../Global_UI/Pixelated_Button';
import { useRef, useState } from 'react';
import { ModeType } from '../../../types/machine.type';
import { useGame } from '../../../game/hooks/useGame';

interface ButtonProps {
	$expanded: boolean;
}

const MenuButtonContainer = styled(PixelCorners3x3) <ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: auto;
  width: 468px;
  height: 76px;
  margin: 10px;
  background-color: black;
  transition: all 1s ease; // Transition for smooth animation
  ${props => props.$expanded && css`
  		position: absolute;	
		transform: translate(0%, calc((66.666% - 564px)));
		width: 544px;
		height: 566px;
      	background-color: #FFF8DC;
      	& > button {
        	opacity: 0; // Hide the button text and border
      	}
  `}
`;

type Props = {
	label: string;
	modeValue: ModeType;
	setExpanded: (expanded: number) => void;
	$backgroundColor: string;
	$key: number;
};

const MenuButton: React.FC<Props> = ({ label, modeValue, $backgroundColor, $key, setExpanded }) => {
	const { send } = useGame();
	const containerRef = useRef<HTMLDivElement>(null);
	const [expanded, setExpandedState] = useState(false);

	const handleTransitionEnd = () => {
		// if (expanded) {
			// Exécuter les événements send après l'animation
			send({ type: 'join', id: 'j1', name: 'Player' });
			send({ type: 'join', id: 'j2', name: 'Bot' });
			send({ type: 'chooseMode', mode: modeValue });
		// }
	};

	const handleButtonClick = () => {
		setExpanded($key); // Déclencher l'animation d'expansion
		setExpandedState(true); // Définir l'état d'expansion
	};

	return (
		<MenuButtonContainer
			$expanded={expanded}
			ref={containerRef}
			onTransitionEnd={handleTransitionEnd} // Écouter la fin de l'animation
		>
			<Pixelated_Button
				color_button={$backgroundColor}
				text={label}
				font_size={'24px'}
				onClick={handleButtonClick}
			/>
		</MenuButtonContainer>
	);
};

export default MenuButton;
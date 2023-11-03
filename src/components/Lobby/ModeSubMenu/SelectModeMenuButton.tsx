import styled, { css } from 'styled-components';
import { PixelCorners3x3 } from '../../../styles/HomeStyles';
import Pixelated_Button from '../../Global_UI/Pixelated_Button';
import { ModeType } from '../../../types/machine';
import { useGame } from '../../../store/hooks/useGame';
import { useRef, useState } from 'react';

interface ButtonProps {
	expanded: boolean;
}

const MenuButtonContainer = styled(PixelCorners3x3)<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 468px;
  height: 76px;
  margin: 10px;
  background-color: black;
  transition: all 5s ease; // Transition for smooth animation
  ${props => props.expanded && css`
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
    $backgroundColor: string;
};

const MenuButton: React.FC<Props> = ({ label, modeValue, $backgroundColor }) => {
    const { send } = useGame();
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleTransitionEnd = () => {
        if (expanded) {
            // Exécuter les événements send après l'animation
            send({ type: 'join', id: 'j1', name: 'Tmp' });
            send({ type: 'join', id: 'j2', name: 'Bot' });
            send({ type: 'chooseMode', mode: modeValue });
        }
    };

    const handleButtonClick = () => {
        setExpanded(true); // Déclencher l'animation d'expansion
    };

    return (
        <MenuButtonContainer
            expanded={expanded}
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
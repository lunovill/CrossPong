import styled, { css, keyframes } from 'styled-components';
import { PixelCorners3x3 } from '../../../styles/HomeStyles';
import Pixelated_Button from '../../Global_UI/Pixelated_Button';
import { useEffect } from 'react';
import { ModeType } from '../../../types/machine.type';
import { useGame } from '../../../game/hooks/useGame';

interface ButtonProps {
	$expanded: number;
	$color?: string;
}

const MenuButtonContainer = styled(PixelCorners3x3) <ButtonProps>`

  display: flex;
  justify-content: center;
  align-items: center;
  width: 468px;
  height: 76px;
  margin: 10px;
  z-index: 8;
  background-color: #FFF8DC;
  transition: background-color 2s ease,
  width 1s ease,
  height 1s ease,
  transform 0.6s ease 0.4s;

  ${props => (props.$expanded !== -1) && css`
    position: absolute;
    animation: ${css`
      ${keyframes`
        from {
          background-color: ${props.$color};
        }
        to {
          background-color: #FFF8DC;
        }
      `} 2s ease;
    `} 
    transform: translate(0%, calc((66.666% - 564px)));
    width: 544px;
    height: 566px;
  `}
`;

type Props = {
	label: string;
	modeValue: ModeType;
	setExpanded: (expanded: number) => void;
	expanded: number;
	$backgroundColor: string;
	$hoverColor?: string;
	$key: number;
};

const MenuButton: React.FC<Props> = ({ label, modeValue, $backgroundColor, $key, setExpanded, expanded, $hoverColor }) => {
	const { send } = useGame();

	useEffect(() => {
		if (expanded === $key) {
			setTimeout(() => {
				handleTransitionEnd();
			}, 1000);
		}
	}, [expanded]);

	const handleTransitionEnd = () => {
		send({ type: 'join', id: 'j1', name: sessionStorage.getItem('pseudo')! });
		send({ type: 'join', id: 'j2', name: (modeValue === 'IA') ? 'Bot' : 'Player2' });
		send({ type: 'chooseMode', mode: modeValue });
	};

	const handleButtonClick = () => {
		setExpanded($key);
	};

	return (
		<>
			{
				(expanded === -1 || expanded === $key) && // Si le bouton n'est pas étendu

				<MenuButtonContainer
					$expanded={expanded}
					$color={$hoverColor}
				>
					{(expanded === -1) &&
						<Pixelated_Button
							color_button={$backgroundColor}
							$hoverColor={$hoverColor}
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
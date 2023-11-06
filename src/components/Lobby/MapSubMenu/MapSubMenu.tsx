import Pixelated_Button from '../../Global_UI/Pixelated_Button';
import MapSwitcherSelector from './MapSwitcherSelector';
import styled from 'styled-components';
import { useGame } from '../../../game/hooks/useGame';

type ButtonColorProps = {
	$color: string;
}

const ReturnButtonContainer = styled.div<ButtonColorProps>`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    color: ${props => props.$color};
    font-family: Yoster Island;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.96px;
    font-family: "Yoster";
    cursor: pointer;
`;

const SelectMapSubMenu = () => {
	const { context, send } = useGame();

	const mainColor = context.current!.mapInfo.mainColor;
	const secondaryColor = context.current!.mapInfo.secondaryColor;
	const thirdColor = context.current!.mapInfo.thirdColor;

	const handleReturn = () => {
		send({ type: 'leave' });
	};

	return (
		<>
			<ReturnButtonContainer $color={secondaryColor} onClick={handleReturn}>
				X
			</ReturnButtonContainer>
			<MapSwitcherSelector />
			<Pixelated_Button
				color_button={mainColor}
				color_outline={secondaryColor}
				$hoverColor={thirdColor}
				position={['40px', '30px']}
				text={'PLAY'}
				onClick={() => {
					send({ type: 'start' });
				}} />
		</>
	);
};

export default SelectMapSubMenu;
import { useState } from 'react';
import styled from 'styled-components';
import { MapTheme } from '../../../types/machine';
import MapInfoContent from './MapInfoContent';
import { PixelCorners3x3, PixelCorners2x2 } from '../../../styles/HomeStyles';

const ButtonContainer =styled(PixelCorners2x2)`	
 position: absolute;
 top: 55px;
 right: 47px;
 z-index: 100;
 width: 35px;
 height: 35px;
 background: #fff7de;
`;

const InfoButton = styled.img`
	position: absolute;
	top: 0;
	right: 0;
	width: 35px;
	z-index: 45;
	height: 35px;
	background: transparent;
	border: none;
	cursor: pointer;
`;
const InfoText = styled.div`
	position: absolute;
	top: 3px;
	left: 13.5px;
	width: 35px;
	z-index: 45;
	font-size: 21px;
	font-family: 'inknutAntiqua', sans-serif;
	height: 35px;
	background: transparent;
	border: none;
	cursor: pointer;
	user-select: none; 
	-webkit-user-select: none;
`;

const WindowOpened = styled(PixelCorners3x3)`	
	position: absolute;
	top: 60px;
	left: 122px;
	z-index: 100;
	width: 300px;
	height: 250px;
	background: #fff7de;
	/* border-radius: 10px; */
`;

const ReturnButtonContainer = styled.div`
    position: absolute;
    top: 0px;
    right: 5px;
    z-index: 10;
    color: "#000000";
    font-family: Yoster Island;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.96px;
    font-family: "Yoster";
    cursor: pointer;
`;

interface Props {
	map: MapTheme;
}

const MapInfo = ({ map }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<ButtonContainer onClick={() => setIsOpen(!isOpen)}>
				<InfoButton src="/UI/pixel_circle.png" />
				<InfoText>
					i
				</InfoText>
			</ButtonContainer>
			{isOpen &&
				(<WindowOpened>
					<ReturnButtonContainer onClick={() => setIsOpen(false)}>
						X
					</ReturnButtonContainer>
					<MapInfoContent map={map} />
				</WindowOpened>)
			}
		</>
	)
}

export default MapInfo
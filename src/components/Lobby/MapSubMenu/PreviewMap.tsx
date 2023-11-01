import styled from 'styled-components';
import { mapsAssets } from '../../../data/models/MapObject';
import { PixelCorners1x1, PixelCorners2x2, PixelCorners3x3 } from '../../../styles/HomeStyles';
import { MapTheme } from '../../../types/machine';

type backgroundProps = {
	$color: string;
}

const ContainerBackgroundBackground = styled(PixelCorners3x3)`
	width: 472PX;
	height: 288px;
	position: absolute;
	z-index: 2;
	top: 33%;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: 1;
	background-color: black;
`

const ContainerBackground = styled(PixelCorners2x2) <backgroundProps>`
	background-color: ${props => props.$color};
	width: 468px;
	height: 284px;
	position: absolute;
	z-index: 3;
	top: 33%;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: 1;
`;

const Container = styled(PixelCorners1x1)`
	background-color: grey;
	width: 464px;
	height: 280px;
	position: absolute;
	top: 33%;
	z-index: 5;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: 0;
	animation: fadeIn 0.4s ease-in 0.2s forwards;

	@keyframes fadeIn {
    	to {
      		opacity: 1;
    	}
  	}
`;

interface ContainerProps {
	$font: string;
	$top: string;
	$fontSize: string;
}

const PreviewImg = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 4;
`

const MapTitleContainer = styled.div<ContainerProps>`
	position: absolute;
	font-family: ${props => props.$font};
	letter-spacing: 0.5px;
	line-height: 1;
	font-size: ${props => props.$fontSize};
	color: white;
	text-align: center;
	width: 50%;
	left: 25%;
	top: ${props => props.$top};
	user-select: none; 
	-webkit-user-select: none;
`

type fontsOption = {
	[key in MapTheme]: string;
}

const fontTopPosition: fontsOption = {
	'ninja': '76%',
	'western': '82%',
	'retro': '74%',
	'medieval': '70%'
}

const fontSize: fontsOption = {
	'ninja': '1.6em',
	'western': '2.35em',
	'retro': '1.7em',
	'medieval': '2.2em'
}

interface PreviewMapProps {
	map: MapTheme;
}
const PreviewMap = ({ map }: PreviewMapProps) => {
	const mapName = mapsAssets[map].mapName;
	const font = mapsAssets[map].font;
	const backgroundColor = mapsAssets[map].secondaryColor;
	const previewImg = mapsAssets[map].previewImagePath;
	return (
		<>
			<ContainerBackgroundBackground />
			<ContainerBackground $color={backgroundColor} />
			<Container key={map}>
				<PreviewImg src={previewImg} />
				<MapTitleContainer $font={font} $top={fontTopPosition[map]} $fontSize={fontSize[map]}>
					{mapName}
				</MapTitleContainer>
			</Container>
		</>

	);
};

export default PreviewMap;
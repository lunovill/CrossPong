import styled from 'styled-components'
import { MapTheme } from '../../../types/machine';

type abilityUrl = {
	[key in MapTheme]: string;
}

interface UltimImgProps {
	$isAvailable: boolean;
	size?: string;
}

const UltimImg = styled.img<UltimImgProps>`
  width: ${(props) => props.size || '96px'};
  height: ${(props) => props.size || '96px'};
  top : 50px;
  left : 150px;
  object-fit: cover;
  filter: ${(props) => (props.$isAvailable ? 'none' : 'grayscale(100%)')};
  
  @media (max-width: 1080px) {
	  width: ${(props) => props.size || '64px'};
	  height: ${(props) => props.size || '64px'};
	}
`;

interface KeyImgProps {
	$j2?: boolean;
}
const KeyImg = styled.img<KeyImgProps>`
  position: absolute;
  width: ${(props) => props.$j2 ? '56px' : '24px'};
  height: 24px;
  z-index: 2;
  left: ${(props) => props.$j2 ? '21px' : '38px'};
  top: -5px;
  object-fit: cover;
  image-rendering: pixelated;
  @media (max-width: 1080px) {
	  left: ${(props) => props.$j2 ? '11px' : '24px'};;
	  width: ${(props) => props.$j2 ? '44px' : '18px'};
	  height: 18px;
	}
`;

const ultimUrls: abilityUrl = {
	'ninja': '/images/hudGame/ultimes/ulti_ninja.png',
	'western': '/images/hudGame/ultimes/ulti_western.png',
	'retro': '/images/hudGame/ultimes/ulti_retro.png',
	'medieval': '/images/hudGame/ultimes/ulti_medieval.png'
}

interface Props {
	map: MapTheme;
	isAvailable: boolean;
	j2?: boolean;
	size?: string;
}

const UltimIcon = ({ map, isAvailable, size, j2 = false }: Props) => {
	return (
		<>
			{
				j2 ? <KeyImg src="/images/hudGame/keys/enter_key.png" alt="key icon" $j2={true} />
					: <KeyImg src="/images/hudGame/keys/r_key.png" alt="key icon" />
			}
			<UltimImg size={size} src={ultimUrls[map]} $isAvailable={isAvailable} alt="ultim icon" />
		</>
	)
}

export default UltimIcon;
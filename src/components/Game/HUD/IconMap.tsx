import styled from 'styled-components'
import { MapTheme } from '../../../types/machine';

const Icon = styled.img`
  width: 128px;
  height: 128px;
  object-fit: cover;
  
  @media (max-width: 768px) {
	  width: 70px;
	  height: 70px;
	}
`;

type mapUrl = {
	[key in MapTheme]: string;
}

const mapUrls: mapUrl = {
	'ninja': '/images/hudGame/iconMap/shuriken.png',
	'western': '/images/hudGame/iconMap/cactus.png',
	'retro': '/images/hudGame/iconMap/skull.png',
	'medieval': '/images/hudGame/iconMap/spikedball.png'
}

interface Props {
	map: MapTheme;
}

const IconMap = ({ map }: Props) => {
	return (
		<Icon src={mapUrls[map]} alt="map icon" />
	)
}

export default IconMap;
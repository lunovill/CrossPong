import styled from 'styled-components';
import { MapTheme } from '../../../types/machine';

interface SpellProps {
	$left: string;
}

const SpellImg = styled.img<SpellProps>`
	position: absolute;
  width: 96px;
  height: 96px;
  top : 5px;
  left : ${(props) => props.$left};
  object-fit: cover;
  
`;

const TitleAbility = styled.div<SpellProps>`
	position: absolute;
	top: 115px;
	left: ${(props) => props.$left};
	width: 100px;
	font-size: 13px;
	text-align: center;
	font-weight: bold;
	font-family: 'inknutAntiqua', sans-serif;
	color: #000000;
	/* text-shadow: 0px 0px 2px black; */
`;

const DescriptionAbility = styled.div<SpellProps>`
	position: absolute;
	width: 120px;
	text-align: center;
	top: 160px;
	left: ${(props) => props.$left};
	font-size: 11px;
	font-family: 'inknutAntiqua', sans-serif;
	color: #000000;
	/* text-shadow: 0px 0px 2px black; */
`;

const TypeAbility = styled.div<SpellProps>`
	position: absolute;
	width: 110px;
	text-align: center;
	top: 100px;
	left: ${(props) => props.$left};
	font-size: 11px;
	font-family: 'inknutAntiqua', sans-serif;
	color: #af5f2a;
	/* text-shadow: 0px 0px 2px black; */
`;

type description = {
	[key in MapTheme]: string;
}

const nameUlti: description = {
	'ninja': 'Shuriken Storm',
	'western': 'Wild West Wind',
	'retro': 'Haunting Mirage',
	'medieval': 'Castle\'s Guard'
}
const descriptionsUlti: description = {
	'ninja': ' Summons two additional balls.',
	'western': 'Unleashes a sandstorm that pushes the ball towards the opponent.',
	'retro': 'Makes the ball invisible during the enemy\'s turn.',
	'medieval': 'Creates a defensive shield behind your paddle.'
}

const nameAbility: description = {
	'ninja': 'Kunoichi Kick',
	'western': 'Miner\'s Move',
	'retro': 'Phantom Fade',
	'medieval': 'Ram\'s Rise'
}

const descriptionsAbility: description = {
	'ninja': 'Charge up for a powerful shot.',
	'western': ' Execute a quick dash.',
	'retro': 'Turns the enemy\'s paddle invisible for a short time.',
	'medieval': ' Summons a pillar on the field.'
}

const abilityUrl: description = {
	'ninja': '/images/hudGame/skills/skill_ninja.png',
	'western': '/images/hudGame/skills/skill_western.png',
	'retro': '/images/hudGame/skills/skill_retro.png',
	'medieval': '/images/hudGame/skills/skill_medieval.png'
}

const ultiUrl: description = {
	'ninja': '/images/hudGame/ultimes/ulti_ninja.png',
	'western': '/images/hudGame/ultimes/ulti_western.png',
	'retro': '/images/hudGame/ultimes/ulti_retro.png',
	'medieval': '/images/hudGame/ultimes/ulti_medieval.png'
}

type Props = {
	map: MapTheme;
}

const MapInfoContent = ({ map }: Props) => {
	return (
		<>
			<SpellImg src={abilityUrl[map]} $left={"30px"} alt="ability icon" />
			<TypeAbility $left={"25px"}>active</TypeAbility>
			<TitleAbility $left={"29px"}>{nameAbility[map]}</TitleAbility>
			<DescriptionAbility $left={"22px"}>{descriptionsAbility[map]}</DescriptionAbility>

			<SpellImg src={ultiUrl[map]} $left={"169px"} alt="ultim icon" />
			<TypeAbility $left={"162px"}>ultimate</TypeAbility>
			<TitleAbility $left={"167.5px"}>{nameUlti[map]}</TitleAbility>
			<DescriptionAbility $left={"158px"}>{descriptionsUlti[map]}</DescriptionAbility>
		</>
	)
}

export default MapInfoContent;
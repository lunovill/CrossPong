import styled from 'styled-components'
import { MapTheme } from '../../../types/machine';
import { useEffect, useState } from 'react';


const SkillContainer = styled.div`
	position: relative;
	width: 128px;
	height: 128px;
`;

interface SkillImgProps {
	$isReady: boolean;
	$j2?: boolean;
}

const SkillImg = styled.img<SkillImgProps>`
	position: absolute;
	width: 128px;
	height: 128px;
	object-fit: cover;
	filter: ${(props) => (props.$isReady ? 'none' : 'grayscale(100%)')};
	
	@media (max-width: 1080px) {
		top: 20px;
		width: 96px;
		height: 96px;
	}
`;

const KeyImg = styled.img`
  position: absolute;
  width: 56px;
  height: 24px;
  z-index: 2;
  left: 38px;
  top: 0px;
  object-fit: cover;
  image-rendering: pixelated;
  @media (max-width: 1080px) {
	  top: 20px;
	  left: 27px;
	  width: 44px;
	  height: 18px;
	}
`;

type abilityUrl = {
	[key in MapTheme]: string;
}

const abilityUrls: abilityUrl = {
	'ninja': '/images/hudGame/skills/skill_ninja.png',
	'western': '/images/hudGame/skills/skill_western.png',
	'retro': '/images/hudGame/skills/skill_retro.png',
	'medieval': '/images/hudGame/skills/skill_medieval.png'
}

const CooldownCircle = styled.svg`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	transform: rotate(-90deg);
	@media (max-width: 1080px) {
		left: -17px;
		top: 6px;
		transform: rotate(-90deg) scale(0.8);
	}   
`;

interface Props {
	map: MapTheme;
	cooldown: number;
	maxCooldown: number;
	j2?: boolean;
}

const SkillIcon = ({ map, cooldown, maxCooldown, j2 = false }: Props) => {
	const [isReady, setIsReady] = useState(true);

	const radius = 25;
	const strokeWidth = 5;
	const circumference = 2 * Math.PI * radius;

	const offset = ((cooldown / maxCooldown) * circumference).toFixed(0);

	useEffect(() => {
		if (cooldown > 0)
			setIsReady(false);
		else
			setIsReady(true);
	}, [cooldown])

	return (
		<>
			{j2 ? <KeyImg src="/images/hudGame/keys/shift_key.png" alt="key icon" />
				: <KeyImg src="/images/hudGame/keys/space_key.png" alt="key icon" />}
			<SkillContainer>
				<SkillImg src={abilityUrls[map]} $isReady={isReady} alt="skill icon" />
				{!isReady && (
					<CooldownCircle>
						<circle
							cx="70"
							cy="66"
							r={radius}
							stroke="#c59c5c"
							strokeWidth={strokeWidth}
							fill="transparent"
							strokeDasharray={circumference}
							strokeDashoffset={offset}
						/>
					</CooldownCircle>
				)}
			</SkillContainer>
		</>
	)
}

export default SkillIcon;
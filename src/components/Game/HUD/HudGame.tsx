import { ReactElement, useEffect, useState } from 'react';
import { useGame } from '../../../game/hooks/useGame';
import LifeBar from './LifeBar'
import styled from 'styled-components'
import IconMap from './IconMap';
import SkillIcon from './Skill';
import UltimIcon from './Ultim';
import { PixelCorners3x3 } from '../../../styles/HomeStyles';

interface TopHudContainerProps {
	$pos: 'left' | 'right';
}

const ProfilPictureContainer = styled(PixelCorners3x3) <TopHudContainerProps>`
	z-index: 43;
	position: absolute;
	width: 64px;
	height: 64px;
	top: 20px;
	left: ${(props) => (props.$pos === 'right' ? 'auto' : '4.5%')};
	right: ${(props) => (props.$pos === 'right' ? '4.5%' : 'auto')};
	@media (max-width: 768px) {
		top: 10px;
		width: 48px;
		height: 48px;
		left: ${(props) => (props.$pos === 'right' ? 'auto' : '20px')};
		right: ${(props) => (props.$pos === 'right' ? '20px' : 'auto')};
	}
`
const ProfilPicture = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	
`

const PseudoContainer = styled.div<TopHudContainerProps>`
	z-index: 42;
	position: absolute;
	top: 10px;
	font-size: 2rem;
	color: #c49b5f;
	font-family: 'inknutAntiqua', serif;
	left: ${(props) => (props.$pos === 'right' ? 'auto' : 'calc(4.5% + 76px)')};
	right: ${(props) => (props.$pos === 'right' ? 'calc(4.5% + 76px)' : 'auto')};
	@media (max-width: 768px) {
		top: 10px;
		font-size: 1rem;
		left: ${(props) => (props.$pos === 'right' ? 'auto' : '75px')};
		right: ${(props) => (props.$pos === 'right' ? '75px' : 'auto')};
	}
`

const LifeBarContainer = styled.div<TopHudContainerProps>`
	z-index: 42;
	position: absolute;
	top: 145px;
	left: ${(props) => (props.$pos === 'right' ? 'auto' : '200px')};
	right: ${(props) => (props.$pos === 'right' ? '200px' : 'auto')};
	@media (max-width: 1080px) {
		top: 150px;
		left: ${(props) => (props.$pos === 'right' ? 'auto' : '125px')};
		right: ${(props) => (props.$pos === 'right' ? '120px' : 'auto')};
	}
	@media (max-width: 768px) {
		top: 83px;
		left: ${(props) => (props.$pos === 'right' ? 'auto' : '86px')};
		right: ${(props) => (props.$pos === 'right' ? '85px' : 'auto')};
	}
`


const IconContainer = styled.div<TopHudContainerProps>`
	z-index: 43;
	position: absolute;
	top: 56px;
	left: ${(props) => (props.$pos === 'right' ? 'auto' : '129px')};
	right: ${(props) => (props.$pos === 'right' ? '130px' : 'auto')};
	@media (max-width: 1080px) {
		top: 64px;
		left: ${(props) => (props.$pos === 'right' ? 'auto' : '50px')};
		right: ${(props) => (props.$pos === 'right' ? '50px' : 'auto')};
	}
	@media (max-width: 768px) {
		top: 36px;
		left: ${(props) => (props.$pos === 'right' ? 'auto' : '50px')};
		right: ${(props) => (props.$pos === 'right' ? '50px' : 'auto')};
	}
`

interface BottomHudContainerProps {
	$pos: 'left' | 'right';
}

const SkillContainer = styled.div<BottomHudContainerProps>`
	z-index: 42;
	position: absolute;
	bottom: 12%;
	right: ${(props) => (props.$pos === 'right' ? 'calc(4% + 76px)' : '')};
	left: ${(props) => (props.$pos === 'right' ? '' : 'calc(4% + 76px)')};
	@media (max-width: 1080px) {
		bottom: 0%;
		left: ${(props) => (props.$pos === 'right' ? '' : 'calc(0% + 80px)')};
		right: ${(props) => (props.$pos === 'right' ? 'calc(0% + 48px)' : '')};
	}
`
const UltiContainer = styled.div<BottomHudContainerProps>`
	z-index: 42;
	position: absolute;
	bottom: calc(12% + 128px);
	right: ${(props) => (props.$pos === 'right' ? '4%' : '')};
	left: ${(props) => (props.$pos === 'right' ? '' : '4%')};
	@media (max-width: 1080px) {
		bottom: calc(-5% + 96px);
		left: ${(props) => (props.$pos === 'right' ? '' : '16px')};
		right: ${(props) => (props.$pos === 'right' ? '2%' : '')};
	}
`

function HudGame(): ReactElement {
	const { context } = useGame();
	const [cooldownSkill, setCooldownSkill] = useState(0);
	const [maxCooldownSkill, setMaxCooldownSkill] = useState(0);
	const [isUltiAvailable, setIsUltiAvailable] = useState(true);

	const [cooldownSkill2, setCooldownSkill2] = useState(0);
	const [maxCooldownSkill2, setMaxCooldownSkill2] = useState(0);
	const [isUltiAvailable2, setIsUltiAvailable2] = useState(true);

	useEffect(() => {
		if (context.physic!.paddlesInfo[0].skill.ulti.isAvailable === false)
			setIsUltiAvailable(false);
	}, [context.physic!.paddlesInfo[0].skill.ulti.isAvailable])

	useEffect(() => {
		if (context.physic!.paddlesInfo[1].skill.ulti.isAvailable === false && context.mode === '2PLocal')
			setIsUltiAvailable2(false);
	}, [context.physic!.paddlesInfo[1].skill.ulti.isAvailable])


	useEffect(() => {
		setMaxCooldownSkill(context.physic!.paddlesInfo[0].cooldown);
	}, [context.physic!.paddlesInfo[0].cooldown]);

	useEffect(() => {
		if (context.mode === '2PLocal')
			setMaxCooldownSkill2(context.physic!.paddlesInfo[1].cooldown);
	}, [context.physic!.paddlesInfo[1].cooldown]);


	useEffect(() => {
		setCooldownSkill(context.physic!.paddlesInfo[0].time);
	}, [context.physic!.paddlesInfo[0].time]);

	useEffect(() => {
		if (context.mode === '2PLocal')
			setCooldownSkill2(context.physic!.paddlesInfo[1].time);
	}, [context.physic!.paddlesInfo[1].time]);

	return (
		<>
			<>
				<PseudoContainer $pos={'left'}>
					{"Pandamanxv3" /* mettre le pseudo du joueur 1 */ }
				</PseudoContainer>
				<ProfilPictureContainer $pos={'left'}>
					<ProfilPicture src={"images/profilPicture/church4.png" /* mettre la photo du joueur 1 */ } alt="Panda" />
				</ProfilPictureContainer>
				<PseudoContainer $pos={'right'}>
					{
						context.mode === '2PLocal' ?
							'Player 2'
							: context.players[1].mapInfo.nameIa
					}
				</PseudoContainer>
				<ProfilPictureContainer $pos={'right'}>
					{
					context.mode === '2PLocal' ?
						<ProfilPicture src="images/profilPicture/church3.png" alt="Panda" /> :
						<ProfilPicture src={context.players[1].mapInfo.pictureIa} alt="Panda" />
					}
				</ProfilPictureContainer>

			</>

			<>
				<IconContainer $pos={'left'}>
					<IconMap map={context.players[0].mapInfo.id} />
				</IconContainer>
				<LifeBarContainer $pos={'left'}>
					<LifeBar lifeRemaining={5 - context.players[1].score} />
				</LifeBarContainer>
				<IconContainer $pos={'right'}>
					<IconMap map={context.players[1].mapInfo.id} />
				</IconContainer>
				<LifeBarContainer $pos={'right'}>
					<LifeBar mirrored={true} lifeRemaining={5 - context.players[0].score} />
				</LifeBarContainer>
			</>

			<>
				<SkillContainer $pos={'right'}>
					{
						context.mode === '2PLocal' ?
							<SkillIcon map={context.players[1].mapInfo.id} cooldown={cooldownSkill2} maxCooldown={maxCooldownSkill2} j2={true} />
							: <SkillIcon map={context.players[0].mapInfo.id} cooldown={cooldownSkill} maxCooldown={maxCooldownSkill} />
					}
				</SkillContainer>
				<UltiContainer $pos={'right'}>
					{
						context.mode === '2PLocal' ?
							<UltimIcon map={context.players[1].mapInfo.id} isAvailable={isUltiAvailable2} j2={true} />
							: <UltimIcon map={context.players[0].mapInfo.id} isAvailable={isUltiAvailable} />
					}
				</UltiContainer>

				{context.mode === '2PLocal' &&
					<>
						<SkillContainer $pos={'left'}>
							<SkillIcon map={context.players[0].mapInfo.id} cooldown={cooldownSkill} maxCooldown={maxCooldownSkill} />
						</SkillContainer>
						<UltiContainer $pos={'left'}>
							<UltimIcon map={context.players[0].mapInfo.id} isAvailable={isUltiAvailable} />
						</UltiContainer>
					</>
				}
			</>

		</>
	)
}

export default HudGame
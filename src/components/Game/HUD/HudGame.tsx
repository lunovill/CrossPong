import { ReactElement, useEffect, useState } from 'react';
import { useGame } from '../../../game/hooks/useGame';
import LifeBar from './LifeBar'
import styled from 'styled-components'
import IconMap from './IconMap';
import SkillIcon from './Skill';
import UltimIcon from './Ultim';
import { PixelCorners3x3 } from '../../../styles/HomeStyles';
import { useInGameState } from '../../../components/ContextBoard';
import { useFrame } from '@react-three/fiber';

interface TopHudContainerProps {
	$pos: 'left' | 'right';
}

const ProfilPictureContainer = styled(PixelCorners3x3) <TopHudContainerProps>`
	z-index: 43;
	position: absolute;
	width: 72px;
	height: 72px;
	top: 20px;
	box-shadow: 10px 10px 10px #000000;
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
const ProfilPictureContainerBg = styled(PixelCorners3x3) <TopHudContainerProps>`
	z-index: 40;
	position: absolute;
	width: 72px;
	height: 72px;
	background-color: #2c2323b9;
	top: 20px;
	left: ${(props) => (props.$pos === 'right' ? 'auto' : '4.5%')};
	right: ${(props) => (props.$pos === 'right' ? '4.5%' : 'auto')};
	transform: ${(props) => (props.$pos === 'right' ? 'translate(5%,5%)' : 'translate(-5%,5%)')};
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

const PseudoContainer = styled(PixelCorners3x3) <TopHudContainerProps>`
	z-index: 42;
	position: absolute;
	top: 40px;
	font-size: 1.2rem;
	color: #5e364e;
	background-color: #f5efdd;
	padding-right: ${(props) => (props.$pos === 'right' ? '20px' : '8px')};
	padding-left: ${(props) => (props.$pos === 'right' ? '8px' : '20px')};
	padding-top: 2px;
	line-height: 1.6;
	text-shadow: 2px 2px 0px #ddb23c;
	font-family: 'inknutAntiqua', serif;
	left: ${(props) => (props.$pos === 'right' ? 'auto' : 'calc(4.5% + 60px)')};
	right: ${(props) => (props.$pos === 'right' ? 'calc(4.5% + 60px)' : 'auto')};
	@media (max-width: 768px) {
		top: 20px;
		font-size: 1rem;
		left: ${(props) => (props.$pos === 'right' ? 'auto' : '60px')};
		right: ${(props) => (props.$pos === 'right' ? '60px' : 'auto')};
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
	const { setInGame } = useInGameState();

	const [pseudo, setPseudo] = useState('Player 1');
	const [profilPicture, setProfilPicture] = useState('images/profilPicture/church4.png');
	const [cooldownSkill, setCooldownSkill] = useState(0);
	const [maxCooldownSkill, setMaxCooldownSkill] = useState(0);
	const [isUltiAvailable, setIsUltiAvailable] = useState(true);

	const [cooldownSkill2, setCooldownSkill2] = useState(0);
	const [maxCooldownSkill2, setMaxCooldownSkill2] = useState(0);
	const [isUltiAvailable2, setIsUltiAvailable2] = useState(true);
	const [frame, setFrame] = useState<number>(0);

	useEffect(() => {
		setInGame(true);
		const Pseudo = sessionStorage.getItem('pseudo');
		const ProfilPicture = sessionStorage.getItem('profilePic');
		if (Pseudo)
			setPseudo(Pseudo);
		if (ProfilPicture)
			setProfilPicture(ProfilPicture);

		setMaxCooldownSkill(context.physic!.paddlesInfo[0].cooldown);
		if (context.mode === '2PLocal')
			setMaxCooldownSkill2(context.physic!.paddlesInfo[1].cooldown);
		return () => {
			setInGame(false);
		}
	}, []);

	useEffect(() => {
		if (context.physic!.paddlesInfo[0].skill.ulti.isAvailable === false)
			setIsUltiAvailable(false);
	}, [context.physic!.paddlesInfo[0].skill.ulti.isAvailable])

	useEffect(() => {
		if (context.physic!.paddlesInfo[1].skill.ulti.isAvailable === false && context.mode === '2PLocal')
			setIsUltiAvailable2(false);
	}, [context.physic!.paddlesInfo[1].skill.ulti.isAvailable])

	useEffect(() => {
		setCooldownSkill(context.physic!.paddlesInfo[0].time);
		if (context.mode === '2PLocal')
			setCooldownSkill2(context.physic!.paddlesInfo[1].time);
		setFrame(prev => prev + 1);
	}, []);

	return (
		<>
			<>
				<PseudoContainer $pos={'left'}>
					{pseudo}
				</PseudoContainer>
				<ProfilPictureContainerBg $pos={'left'} />
				<ProfilPictureContainer $pos={'left'}>
					<ProfilPicture src={profilPicture} alt="ProfilIconPlayer1" />
				</ProfilPictureContainer>
				<PseudoContainer $pos={'right'}>
					{
						context.mode === '2PLocal' ?
							'Player 2'
							: context.players[1].mapInfo.nameIa
					}
				</PseudoContainer>
				<ProfilPictureContainerBg $pos={'right'} />

				<ProfilPictureContainer $pos={'right'}>
					{
						context.mode === '2PLocal' ?
							<ProfilPicture src="images/profilPicture/church3.png" alt="ProfilIconPlayer2" /> :
							<ProfilPicture src={context.players[1].mapInfo.pictureIa} alt="ProfilIconAI" />
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
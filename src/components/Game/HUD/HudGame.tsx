import { ReactElement, useEffect, useState } from 'react';
import { useGame } from '../../../store/hooks/useGame';
import LifeBar from './LifeBar'
import styled from 'styled-components'
import IconMap from './IconMap';
import SkillIcon from './Skill';
import UltimIcon from './Ultim';

interface TopHudContainerProps {
	$pos: 'left' | 'right';
}
const LifeBarContainer = styled.div<TopHudContainerProps>`
	z-index: 42;
	position: absolute;
	top: 95px;
	left: ${(props) => (props.$pos === 'right' ? 'auto' : '150px')};
	right: ${(props) => (props.$pos === 'right' ? '150px' : 'auto')};
	@media (max-width: 768px) {
		top: 55px;
		left: ${(props) => (props.$pos === 'right' ? 'auto' : '65px')};
		right: ${(props) => (props.$pos === 'right' ? '65px' : 'auto')};
	}
`

const IconContainer = styled.div<TopHudContainerProps>`
	z-index: 43;
	position: absolute;
	top: 6px;
	left: ${(props) => (props.$pos === 'right' ? 'auto' : '79px')};
	right: ${(props) => (props.$pos === 'right' ? '80px' : 'auto')};
	@media (max-width: 768px) {
		top: 0px;
		left: ${(props) => (props.$pos === 'right' ? 'auto' : '0px')};
		right: ${(props) => (props.$pos === 'right' ? '0px' : 'auto')};
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
		if (context.players[0].canUseUlti === false)
			setIsUltiAvailable(false);
	}, [context.players[0].canUseUlti])

	useEffect(() => {
		if (context.players[1].canUseUlti === false && context.mode === '2PLocal')
			setIsUltiAvailable2(false);
	}, [context.players[1].canUseUlti])


	useEffect(() => {
		setMaxCooldownSkill(context.players[0].power.cooldown);
	}, [context.players[0].power.cooldown])

	useEffect(() => {
		if (context.mode === '2PLocal')
			setMaxCooldownSkill2(context.players[1].power.cooldown);
	}, [context.players[1].power.cooldown])


	useEffect(() => {
		setCooldownSkill(context.players[0].power.time);
	}, [context.players[0].power.time])

	useEffect(() => {
		if (context.mode === '2PLocal')
			setCooldownSkill2(context.players[1].power.time);
	}, [context.players[1].power.time])

	return (
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
	)
}

export default HudGame
import { ReactElement, useState } from 'react';
import { useGame } from '../../../store/hooks/useGame';
import { useFrame } from '@react-three/fiber';
import { MapTheme } from '../../../types/machine';
import { NinjaSkillInfoProps } from '../../../store/physic/NinjaPaddle';
import { RetroSkillInfoProps } from '../../../store/physic/RetroPaddle';
import Physic from '../../../store/physic/Phisic';
import { WesternSkillInfoProps } from '../../../store/physic/WesternPaddle';

type Info = Physic['ballsInfo'][0] & { effect: string };

export default function Ball(): ReactElement {
	const { context } = useGame();
	const [info, setInfo] = useState<Info[]>([{
		position: { x: 0, y: 0, z: 0 },
		velocity: { x: 0, y: 0, z: 0 },
		collision: 0,
		effect: 'none'
	}]);
	const BallPlayer = context.players[0].Ball();
	const BallOpponent = context.players[1].Ball();

	const effect = () => {
		let effect: string | undefined;
		context.players.forEach((p, i) => {
			if (!effect && p.mapInfo.id === MapTheme.NINJA && (context.physic!.paddlesInfo[i].skill as NinjaSkillInfoProps).power.effect)
				effect = 'ninjaPower';
			if ((!effect || effect !== 'retroUlti') && p.mapInfo.id === MapTheme.WESTERN && (context.physic!.paddlesInfo[i].skill as WesternSkillInfoProps).ulti.isActive)
				effect = 'westernUlti';
			if (p.mapInfo.id === MapTheme.RETRO && (context.physic!.paddlesInfo[i].skill as RetroSkillInfoProps).ulti.effect)
				effect = 'retroUlti';
		});
		return effect ?? 'none';
	};
	useFrame(() => {
		const newInfo: Info[] = context.physic!.ballsInfo.map(b => ({ ...b, effect: effect() }));
		(JSON.stringify(newInfo) !== JSON.stringify(info)) && setInfo(newInfo);
	});

	return <>
		{
			info.map((b, i) => [
				(context.current!.id === 'j1')
					? <BallPlayer key={`player-${i}`} position={b.position} velocity={b.velocity} collision={b.collision} effect={b.effect} />
					: <BallOpponent key={`opponent-${i}`} position={b.position} velocity={b.velocity} collision={b.collision} effect={b.effect} />
			])
		}
	</>;
}

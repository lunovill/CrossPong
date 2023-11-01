import { ReactElement, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import UltiAnimation from '../../Animation/UltiAnimation';
import { useGame } from '../../../store/hooks/useGame';
import { MapTheme } from '../../../types/machine';
import Physic from '../../../store/physic/Phisic';
import TextThreeTwoOne from '../../Animation/TextThreeTwoOne';

type Info = Physic['paddlesInfo'][0] & { effect: string };

export default function Player(): ReactElement {
	const { state, context, send } = useGame();
	const [info, setInfo] = useState<[Info, Info]>([
		{ ...context.physic!.paddlesInfo[0], effect: 'none' },
		{ ...context.physic!.paddlesInfo[1], effect: 'none' },
	]);
	const [index, setIndex] = useState<number>(context.players.findIndex(p => p.id === context.current!.id));
	const player = context.players[0];
	const opponent = context.players[1];
	const PaddlePlayer = player.Paddle();
	const PaddleOpponent = opponent.Paddle();
	const [_, getKeys] = useKeyboardControls<string>();
	const [collision, setCollision] = useState<[boolean, boolean]>([false, false]);
	const [isAnimation, setIsAnimation] = useState<boolean>(true);

	const handleScoreEvent = (index: number, isBall: boolean): void => {
		send({ type: 'score', index, isBall });
		send({ type: 'start', isBall });
		(isBall) && setIsAnimation(true);
	};

	const keyEnvent = (index: number, { leftward, rightward, power, ulti }: { leftward: boolean, rightward: boolean, power: boolean, ulti: boolean }) => {
		const current = !index ? player : opponent;
		if (!current.power.time) {
			if (current.mapInfo.id === MapTheme.NINJA) {
				if (collision[index]) { power = false; (!index) ? setCollision([false, collision[1]]) : setCollision([collision[0], false]); }
				if (!power && context.physic!.paddlesInfo[index].skill!.power.isActive) {
					send({ type: 'power', id: `j${index + 1}` });
					send({ type: 'update' });
				}
				context.physic?.setPower(index, power);
			} else {
				context.physic?.setPower(index, power);
				if (context.physic!.paddlesInfo[index].skill.power.isActive) {
					send({ type: 'power', id: `j${index + 1}` });
					send({ type: 'update' });
				}
			}
		}
		if (ulti) {
			context.physic?.setUlti(index, true);
			if (context.physic!.paddlesInfo[index].skill.ulti.isActive) {
				setIndex(index);
				send({ type: 'ulti', id: `j${index + 1}` });
			}
		}
		context.physic!.setKeys(index, { leftward, rightward });
	};

	const handleKeyEvent = (context.mode === 'IA')
		? (): void => {
			const { leftward, rightward, power, ulti } = (isAnimation)
				? { leftward: false, rightward: false, power: false, ulti: false }
				: getKeys();
			keyEnvent(0, { leftward, rightward, power, ulti });
			keyEnvent(1, { ...context.physic!.bot, power: false, ulti: false });
		} : (): void => {
			const { keyUpward, keyDownward, arrowUpward, arrowDownward, power, power2, ulti, ulti2 } = (isAnimation)
				? { keyUpward: false, keyDownward: false, arrowUpward: false, arrowDownward: false, power: false, power2: false, ulti: false, ulti2: false }
				: getKeys();
			keyEnvent(0, { leftward: keyUpward, rightward: keyDownward, power, ulti });
			keyEnvent(1, { leftward: arrowDownward, rightward: arrowUpward, power: power2, ulti: ulti2 });
		};

	const effect = (index: number): string => {
		const indexOpponent = index ? 0 : 1;
		if (context.players[indexOpponent].mapInfo.id === MapTheme.RETRO && context.physic!.paddlesInfo[indexOpponent].skill.power.isActive)
			return 'retroPower';
		return 'none';
	};

	useEffect(() => { (isAnimation === true) && (setTimeout(() => { setIsAnimation(false); }, 4000)); }, [isAnimation]);
	useEffect(() => {
		context.physic!.on('score', handleScoreEvent);
		return () => { context.physic!.off('score', handleScoreEvent); }
	}, []);

	useEffect(() => { setCollision([true, collision[1]]); }, [info[0].collision]);
	useEffect(() => { setCollision([collision[0], true]); }, [info[1].collision]);

	useFrame(() => {
		(player.power.time) && (send({ type: 'update' }));
		(state === 'Play') && handleKeyEvent();
		const newInfo: [Info, Info] = [
			{ ...context.physic!.paddlesInfo[0], effect: effect(0) },
			{ ...context.physic!.paddlesInfo[1], effect: effect(1) }
		];
		(JSON.stringify(newInfo) !== JSON.stringify(info)) && setInfo(newInfo);
	});

	return <>
		{context.animation === 'Ulti' && <UltiAnimation index={index} />}
		{isAnimation && <TextThreeTwoOne />}
		<PaddlePlayer
			effect={info[0].effect}
			position={info[0].position}
			velocity={info[0].velocity}
			location={player.location!}
			skillInfo={info[0].skill}
			collision={info[0].collision} />
		<PaddleOpponent
			effect={info[1].effect}
			position={info[1].position}
			velocity={info[1].velocity}
			location={opponent.location!}
			skillInfo={info[1].skill}
			collision={info[1].collision} />
	</>;
}
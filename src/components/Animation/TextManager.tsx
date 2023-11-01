import  { useState } from 'react';
import { TextAnimationVersus, SimpleText } from './TextAnimation';
import { useGame } from '../../store/hooks/useGame';
import { useFrame } from '@react-three/fiber';

export const TextManagerIntro = () => {
	const [fontActive, setFontActive] = useState(0);
	const [startTime, setStartTime] = useState<number | null>(null);
	const [opacity, setOpacity] = useState(1);
	const { context } = useGame();
	const themePlayer = context.players[0].mapInfo.id;
	const themeOpponent = context.players[1].mapInfo.id;

	useFrame((delta) => {
		if (startTime === null) {
			setStartTime(delta.clock.elapsedTime);
			return;
		}
		const elapsedTime = delta.clock.elapsedTime - startTime;

		if (fontActive === 0 && elapsedTime > 2 && opacity > 0)
			setOpacity(opacity - 0.02)
		if (fontActive === 0 && elapsedTime > 3) {
			setOpacity(1);
			setFontActive(1);
		}

		if (fontActive === 1 && elapsedTime > 4.8 && opacity > 0)
			setOpacity(opacity - 0.03)
		if (fontActive === 1 && elapsedTime > 8) {
			setOpacity(1);
			setFontActive(2);
		}


		if (context.starsRef) {
			context.starsRef.current?.position.set(3, 0, 0);
			context.starsRef.current?.scale.set(Math.cos(elapsedTime), 1, 1);
		}
	});

	return (
		<>
			{fontActive === 0 &&
				<TextAnimationVersus themePlayer={themePlayer} themeOpponent={themeOpponent} opacity={opacity} />}
			{fontActive === 1 &&
				<SimpleText opacity={opacity} text={"Ready ?"} position={[0, -10, 3]} rotation={[Math.PI / 2, 0, 0]} />}
		</>
	)
}

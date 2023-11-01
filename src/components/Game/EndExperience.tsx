import { ReactElement, useEffect } from 'react';
import { RootState, useFrame, useThree } from '@react-three/fiber';
import { useGame } from '../../store/hooks/useGame';

export default function EndExperience(): ReactElement {
	const { camera } = useThree<RootState>();
	const { context } = useGame();
	let angle = 0;

	useFrame(() => {
		angle += 0.01;
		camera.position.x = Math.cos(angle / 2) * 10;
		camera.position.y = Math.sin(angle / 2) * 10;
	});

	useEffect(() => {
		if (context.mode === '2PLocal') {
			camera.position.x = 0;
			camera.position.y = -3;
			camera.position.z = 10;
		} else {
			camera.position.x = -8.7 * (context.players[0].location as -1 | 1);
			camera.position.y = 0;
			camera.position.z = 10.6;
		}
	}, []);

	return <></>;
}
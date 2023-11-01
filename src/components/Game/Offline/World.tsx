import { ReactElement, useEffect } from 'react';
import { RootState, useThree } from '@react-three/fiber';
import Ball from './Ball';
import Player from './Player';
import Area from '../Area';
import Lights from '../Lights';
import IntroAnimation from '../../Animation/IntroAnimation';
import EndAnimation from '../../Animation/EndAnimation';
import { useGame } from '../../../store/hooks/useGame';

export default function World(): ReactElement {
	const { camera } = useThree<RootState>();
	const { state, context } = useGame();

	const updateCameraPosition = () => {
		if (state === 'Play') {
			const width = window.innerWidth;
			if (context.mode === '2PLocal') {

				if (width < 1200) {
					const y = -10 + (-3) * ((1200 - width + 250) / (1200 - 900));
					const z = 8 + 3.2 * ((1200 - width + 250) / (1200 - 900));
					camera.position.set(0, y, z);
				} else {
					camera.position.set(0, -10, 8);
				}
			} else {
				if (width < 1200) {
					const x = -8.7 + (-10 + 8.5) * ((1200 - width + 250) / (1200 - 900));
					const z = 1.6 + 2.2 * ((1200 - width + 250) / (1200 - 900));
					camera.position.set(x, 0, z);
				} else {
					camera.position.set(-9.9, 0, 3.8);
				}
			}
		}
	};
	useEffect(() => {
		updateCameraPosition();
		const handleResize = () => { updateCameraPosition(); };
		window.addEventListener('resize', handleResize);
		
		return () => { window.removeEventListener('resize', handleResize); };
	}, [state]);
	
	return <>
		{context.animation === 'Intro' && <IntroAnimation />}
		{context.animation === 'End' && <EndAnimation />}
		{context.animation !== 'Intro' && <Area />}
		<Lights />
		{context.animation !== 'Intro' && <Player />}
		{context.animation !== 'Intro' && <Ball />}
	</>;
}
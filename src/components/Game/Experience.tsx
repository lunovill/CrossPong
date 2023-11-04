import { ReactElement, Suspense, useEffect, useRef } from 'react';
import EndExperience from './EndExperience';
import StarsAnimation from '../Animation/StarsAnimation'
import BackGroundTransition from '../BackGroundTransition';
import { useGame } from '../../game/hooks/useGame';
import World from './World';

export default function Experience(): ReactElement {
	const { state, send } = useGame();
	const starsRef = useRef<THREE.Group>(null);

	useEffect(() => {
		send({ type: 'setStarsRef', starsRef });
	}, [starsRef]);

	return <>
		{
			(['Mode', 'Map'].includes(state))
				? <BackGroundTransition />
				: <>
					<Suspense><World /></Suspense>
					{(state === 'End') && <EndExperience />}
				</>
		}
		{
			(['Mode', 'Map'].includes(state)) &&
			<group>
				<StarsAnimation refStars={starsRef} />
			</group>
		}
	</>;
}
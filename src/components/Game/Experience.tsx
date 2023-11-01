import { ReactElement, useEffect, useRef } from 'react';
import EndExperience from './EndExperience';
import Play from './Play';
import StarsAnimation from '../Animation/StarsAnimation'
import BackGroundTransition from '../BackGroundTransition';
import { useGame } from '../../store/hooks/useGame';

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
					<Play />
					{(state === 'End') && <EndExperience />}
				</>
		}
		{(['Mode', 'Map', 'Loading'].includes(state)) &&
			<group>
				<StarsAnimation refStars={starsRef} />
			</group>
		}
	</>;
}
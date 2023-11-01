import { useEffect, ReactElement, useState } from 'react';
import { Position } from '../../store/Player';
import WindShader from '../GLBtoJSX/Shaders/WindShader';
import { hexToRgb } from '../GLBtoJSX/Shaders/FlamShader';

interface PowerEffectProps {
	position: Position;
}

export default function NinjaPowerEffect({ position }: PowerEffectProps): ReactElement {
	const [isNinjaPowerActive, setIsNinjaPowerActive] = useState(true);

	useEffect(() => {
		if (isNinjaPowerActive) {
			const timeout = setTimeout(() => {
				setIsNinjaPowerActive(false);
			}, 900);
			return () => {
				clearTimeout(timeout);
			};
		}
	}, [isNinjaPowerActive]);

	return <>
		{
			isNinjaPowerActive &&
			<>
				<WindShader position={[position.x - 0.8, position.y, 0.2]} scale={[0.4, 0.4, 0.4]}
					rotation={[0, Math.PI, Math.PI / 2]} color1={hexToRgb("#0d2f8d")} speed={1000} />
				<WindShader position={[position.x - 1.2, position.y, 0.1]} scale={[0.3, 0.3, 0.3]}
					rotation={[0, Math.PI, Math.PI / 2]} color1={hexToRgb("#000000")} speed={1000} />
				<WindShader position={[position.x - 0.9, position.y, 0.3]} scale={[0.35, 0.35, 0.35]}
					rotation={[0, Math.PI, Math.PI / 2]} color1={hexToRgb("#7b1196")} speed={2000} />
			</>
		}
	</>;
}
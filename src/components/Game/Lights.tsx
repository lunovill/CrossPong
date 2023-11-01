import { ReactElement, useRef } from 'react';
import { DirectionalLight } from 'three';

export default function Lights(): ReactElement {
	const light = useRef<DirectionalLight>(null);

	return <>
		<directionalLight ref={light}
		color={
		"rgb(221, 223, 250)"
		}
			castShadow
			position={[0, 0, 4]}
			intensity={4.5}
			shadow-mapSize={[1024, 1024]}
			shadow-camera-near={1}
			shadow-camera-far={10}
			shadow-camera-top={10}
			shadow-camera-right={10}
			shadow-camera-bottom={-10}
			shadow-camera-left={-10}
		/>
		<ambientLight intensity={1.5} color={
		"rgb(255, 255, 255)"
		}/>
	</>
}
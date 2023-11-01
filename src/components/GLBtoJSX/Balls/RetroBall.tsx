import { useGLTF } from "@react-three/drei";
import { BallProps } from "../../../types/Map";
import { GLTF } from 'three-stdlib'
import { MutableRefObject, ReactElement, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { Position } from "../../../store/Player";
import FlameShader, { hexToRgb } from "../Shaders/FlamShader";
import chroma from "chroma-js";
import { RetorUltiEffect } from "../../Effects/RetroUltiEffect";
import NinjaPowerEffect from "../../Effects/NinjaPowerEffect";
import { WesternUltiEffect } from "../../Effects/WesternUltiEffect";

type GLTFResultRetroBall = GLTF & {
	nodes: {
		model_1: THREE.Mesh
	}
	materials: {
		['Material.014']: THREE.MeshStandardMaterial
	}
};

interface RetroBallAnimationProps {
	groupRef: MutableRefObject<Group | null>,
	velocity: Position
};

function RetroBallAnimation({ groupRef, velocity }: RetroBallAnimationProps): ReactElement {
	const rotation = useRef<number>(0);

	useFrame(() => {
		if (groupRef.current) {
			const group: Group = groupRef.current;
			const angle: number = Math.atan2(velocity.y, velocity.x);
			const speed: number = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
			const time: number = Date.now();
			rotation.current += speed * 0.01;

			group.position.z = Math.sin(time * 0.005) * 0.1;
			group.rotation.y = angle + Math.PI / 2;
		}
	});

	return <></>;
}

interface RetroBallEffectProps {
	velocity: Position
};

function RetroBallEffect({ velocity }: RetroBallEffectProps): ReactElement {
	const chromaScale = chroma.scale(['#29232c', '#b66638', '#46424e', '#b66638', '#29232c']);
	const isMoving = useRef<boolean>(false);
	const color = useRef<string>('#991b1b');
	const time = useRef<number>(0);

	useFrame(() => {
		const speed: number = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
		isMoving.current = (speed > 0.1) ? true : false;
		if (isMoving.current) {
			time.current = (time.current + 0.005) % 1;
			color.current = chromaScale(time.current).hex();
		}
	});

	return <group>
		{
			(isMoving) && <>
				<FlameShader position={[0, 0.04, -0.32]} scale={[0.3, 0.15, 0.3]} rotation={[Math.PI / 2, 0, 0]} color1={hexToRgb('#dfc2a2')} />
				<FlameShader position={[0, 0.04, -0.32]} scale={[0.31, 0.13, 0.32]} rotation={[Math.PI / 2, 2, 0]} color1={hexToRgb('#8b7777')} />
				<FlameShader position={[0, 0.08, -0.3]} scale={[0.1, 0.15, 0.32]} rotation={[Math.PI / 2, 0.5, 0]} color1={hexToRgb('#8abea9')} />
				<FlameShader position={[0, 0.04, -0.32]} scale={[0.28, 0.16, 0.24]} rotation={[Math.PI / 2, 1, 0]} color1={hexToRgb('#e06411')} />
				<FlameShader position={[0, 0.04, -0.33]} scale={[0.21, 0.11, 0.20]} rotation={[Math.PI / 2, 1, 0]} color1={hexToRgb('#a71f89')} />
			</>
		}
	</group>;
}

export default function RetroBall({ animation = true, effect = 'none', position = { x: 0, y: 0, z: 0 }, velocity = { x: 0, y: 0, z: 0 }, collision = 0, rotation=[Math.PI / 2, Math.PI / 2, 0] }: BallProps) {
	const { nodes, materials } = useGLTF('./assets/balls&paddles/retroBall.glb') as GLTFResultRetroBall
	const groupRef = useRef<Group>(null);

	useFrame(() => (groupRef.current) && groupRef.current.position.set(position.x, position.y, position.z));

	return (<>
		{(animation) && <RetroBallAnimation groupRef={groupRef} velocity={velocity} />}
		{(effect === 'ninjaPower') && <NinjaPowerEffect position={position} />}
		{(effect === 'westernUlti') && <WesternUltiEffect groupRef={groupRef} />}
		{(effect === 'retroUlti') && <RetorUltiEffect groupRef={groupRef} collision={collision} />}
		<group ref={groupRef}
			rotation={rotation}
			scale={[1, 1, 1]}
			position={[0, 0, 0]}>
			{(effect === 'none') && <RetroBallEffect velocity={velocity} />}
			<group
				scale={[0.004, 0.004, 0.0036]}
				dispose={null}>
				<group>
					<mesh
						geometry={nodes.model_1.geometry}
						rotation={[0.5, 0, 0]}
						scale={[1, 1, 1]}
						material={materials['Material.014']}
						castShadow >
					</mesh>
				</group>
			</group>
		</group>
	</>
	)
}
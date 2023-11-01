import { MutableRefObject, useMemo, useRef } from "react";
import { GLTFResult, BallProps } from "../../../types/Map";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Position } from "../../../store/Player";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { RetorUltiEffect } from "../../Effects/RetroUltiEffect";
import NinjaPowerEffect from "../../Effects/NinjaPowerEffect";
import { WesternUltiEffect } from "../../Effects/WesternUltiEffect";

interface WesternBallAnimationProps {
	groupRef: MutableRefObject<Group | null>,
	flowerRef: MutableRefObject<Mesh | null>,
	velocity: Position,
	rotation: [number, number, number],
}

export function WesternBallAnimation({ groupRef, flowerRef, velocity, rotation = [0, 0, 0] }: WesternBallAnimationProps) {
	const currentRotation = useRef<number>(0);

	useFrame(() => {
		if (groupRef.current) {
			const group: Group = groupRef.current;
			const speed: number = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
			const time: number = Date.now();
			currentRotation.current += speed * 0.01;

			(flowerRef.current) && (flowerRef.current.rotation.z = time * 0.02 + currentRotation.current);
			group.rotation.x = Math.sin(time * 0.001) * 0.2 + rotation[0];
			group.rotation.y += (velocity.x * 0.04 - group.rotation.y) * 0.1 + rotation[1];
			group.rotation.z = time * 0.0005 + currentRotation.current + rotation[2];

			group.position.y += Math.cos(time * 0.001) * 0.1;
			group.position.z += -Math.abs(Math.sin(time * 0.001)) * 0.1;
		}
	});

	return <></>;
}

export default function WesternBall({ animation = true, effect = 'none', position = { x: 0, y: 0, z: 0 }, rotation = [0, 0, 0], velocity = { x: 0, y: 0, z: 0 }, collision = 0 }: BallProps) {
	const { nodes, materials } = useGLTF('./assets/balls&paddles/Balls&Paddles.glb') as GLTFResult;
	const material = useMemo<MeshStandardMaterial>(() => materials.Material__25.clone(), []);
	const groupRef = useRef<Group>(null);
	const flowerRef = useRef<Mesh>(null)

	useFrame(() => (groupRef.current) && groupRef.current.position.set(position.x, position.y, position.z));

	return (
		<>
			{(animation) && <WesternBallAnimation groupRef={groupRef} flowerRef={flowerRef} velocity={velocity} rotation={rotation} />}
			{(effect === 'ninjaPower') && <NinjaPowerEffect position={position} />}
			{(effect === 'westernUlti') && <WesternUltiEffect groupRef={groupRef} />}
			{(effect === 'retroUlti') && <RetorUltiEffect groupRef={groupRef} collision={collision} />}
			<group ref={groupRef}>
				<group
					dispose={null}>
					<mesh

						geometry={nodes.Cactus.geometry}
						material={material}
						scale={0.000127}
						castShadow >
					</mesh>
					<mesh

						ref={flowerRef}
						geometry={nodes.Cactus_Fleur.geometry}
						material={material}
						scale={0.000127}
						position={[0, 0, 0.13]}
						castShadow >
					</mesh>
				</group>
			</group>
		</>
	)
}
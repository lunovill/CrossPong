import { useGLTF } from "@react-three/drei";
import { GLTFResult, BallProps } from "../../../types/Map";
import { MutableRefObject, ReactElement, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MeshStandardMaterial } from "three";
import { Position } from "../../../store/Player";
import { RetorUltiEffect } from "../../Effects/RetroUltiEffect";
import NinjaPowerEffect from "../../Effects/NinjaPowerEffect";
import { WesternUltiEffect } from "../../Effects/WesternUltiEffect";

interface MedievalBallAnimationProps {
	groupRef: MutableRefObject<Group | null>,
	velocity: Position
};

function MedievalBallAnimation({ groupRef, velocity }: MedievalBallAnimationProps): ReactElement {
	const rotation = useRef<number>(0);

	useFrame(() => {
		if (groupRef.current) {
			const group: Group = groupRef.current;
			const angle: number = Math.atan2(velocity.y, velocity.x);
			const speed: number = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
			rotation.current += speed * 0.01;

			group.rotation.y += (rotation.current * 3 - group.rotation.y) * 0.1;
			group.rotation.x = angle * 3;
		}
	});
	return <></>;
}

export default function MedievalBall({ animation = true, effect = 'none', position = { x: 0, y: 0, z: 0 }, rotation = [0, 0, 0], velocity = { x: 0, y: 0, z: 0 }, collision = 0 }: BallProps) {
	const { nodes, materials } = useGLTF('./assets/balls&paddles/Balls&Paddles.glb') as GLTFResult;
	const material = useMemo<MeshStandardMaterial>(() => materials.Material__25.clone(), []);
	const groupRef = useRef<Group>(null);

	useFrame(() => (groupRef.current) && groupRef.current.position.set(position.x, position.y, position.z));

	return (
		<>
			{(animation) && <MedievalBallAnimation groupRef={groupRef} velocity={velocity} />}
			{(effect === 'ninjaPower') && <NinjaPowerEffect position={position} />}
			{(effect === 'westernUlti') && <WesternUltiEffect groupRef={groupRef} />}
			{(effect === 'retroUlti') && <RetorUltiEffect groupRef={groupRef} collision={collision} />}
			<group ref={groupRef}
				rotation={rotation}
				position={[0, 0, 0]}
				scale={0.0001}
				dispose={null}>
				<mesh
					geometry={nodes.Balle.geometry}
					position={[-26.216, -7.471, 1.845]}
					material={material}
					castShadow >
				</mesh>
				<mesh
					geometry={nodes.Balle_Pique.geometry}
					position={[-26.216, -7.471, 1.845]}
					material={material}
					castShadow >
				</mesh>
			</group>
		</>
	)
}
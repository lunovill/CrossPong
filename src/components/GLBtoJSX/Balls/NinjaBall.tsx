import { useGLTF } from "@react-three/drei";
import { GLTFResult, BallProps } from "../../../types/Map";
import { MutableRefObject, ReactElement, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MeshStandardMaterial } from "three";
import { Position } from "../../../store/Player";
import FlameShader, { hexToRgb } from "../Shaders/FlamShader";
import { RetorUltiEffect } from "../../Effects/RetroUltiEffect";
import NinjaPowerEffect from "../../Effects/NinjaPowerEffect";
import { WesternUltiEffect } from "../../Effects/WesternUltiEffect";

interface NinjaBallAnimationProps {
	groupRef: MutableRefObject<Group | null>,
	ballRef: MutableRefObject<Group | null>,
	velocity: Position
};

function NinjaBallAnimation({ groupRef, ballRef, velocity }: NinjaBallAnimationProps): ReactElement {
	const rotation = useRef<number>(0);

	useFrame(() => {
		if (groupRef.current) {
			const group: Group = groupRef.current;
			const speed: number = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
			rotation.current += speed * 0.01;

			(ballRef.current) && (ballRef.current.rotation.z = rotation.current * 5);
			group.rotation.x = Math.sin(group.position.y) * 0.3;
		}
	});

	return <></>;
}

interface NinjaBallEffectProps {
	velocity: Position
};

function NinjaBallEffect({ velocity }: NinjaBallEffectProps): ReactElement {
	const shaderRef = useRef<Group>(null);

	useFrame(() => {
		if (shaderRef.current) {
			const angle: number = Math.atan2(-velocity.y, velocity.x);
			shaderRef.current.rotation.z = -(angle + Math.PI / 2);
		}
	});

	return <group ref={shaderRef}>
		<FlameShader position={[0, -0.455, -0.008]} scale={[0.5, 0.15, 0.05]} rotation={[0, 0, 0]} color1={hexToRgb("#dfc2a2")} />
		<FlameShader position={[0, -0.455, -0.01]} scale={[0.55, 0.15, 0.04]} rotation={[0, 0, 0]} color1={hexToRgb("#8abea9")} />
		<FlameShader position={[0, -0.455, -0.01]} scale={[0.1, 0.18, 0.05]} rotation={[0, 0, 0]} color1={hexToRgb("#2261d4")} />
		<FlameShader position={[0, -0.455, -0.01]} scale={[0.12, 0.18, 0.05]} rotation={[0, 0, 0]} color1={hexToRgb("#020000")} />
	</group>;
}

export default function NinjaBall({ animation = true, effect = 'none', position = { x: 0, y: 0, z: 0 }, velocity = { x: 0, y: 0, z: 0 }, collision = 0 }: BallProps) {
	const { nodes, materials } = useGLTF('./assets/balls&paddles/Balls&Paddles.glb') as GLTFResult;
	const material = useMemo<MeshStandardMaterial>(() => materials.Material__25.clone(), []);
	const groupRef = useRef<Group>(null);
	const ballRef = useRef<THREE.Group>(null);

	useFrame(() => (groupRef.current) && groupRef.current.position.set(position.x, position.y, position.z));

	return (
		<>
			{(animation) && <NinjaBallAnimation groupRef={groupRef} ballRef={ballRef} velocity={velocity} />}
			{(effect === 'ninjaPower') && <NinjaPowerEffect position={position} />}
			{(effect === 'westernUlti') && <WesternUltiEffect groupRef={groupRef} />}
			{(effect === 'retroUlti') && <RetorUltiEffect groupRef={groupRef} collision={collision} />}
			<group ref={groupRef}
				position={[0, 0, 0]}
				scale={[1.2, 1.2, 1.2]}>
				{(effect === 'none') && <NinjaBallEffect velocity={velocity} />}
				<group ref={ballRef}
					scale={[0.00006, 0.00006, 0.00009]}
					dispose={null}>
					<mesh
						geometry={nodes.Shuriken.geometry}
						material={material}
						rotation={[Math.PI / 2, 0, 0]}
						castShadow >
					</mesh>
					<group>
						<mesh
							geometry={nodes.Shuriken_Lame02.geometry}
							material={material}
							rotation={[Math.PI / 2, Math.PI / 2, 0]}
							castShadow >
						</mesh>
						<mesh
							geometry={nodes.Shuriken_Lame02.geometry}
							material={material}
							rotation={[Math.PI / 2, -Math.PI / 2, 0]}
							castShadow >
						</mesh>
						<mesh
							geometry={nodes.Shuriken_Lame02.geometry}
							material={material}
							rotation={[Math.PI / 2, Math.PI, 0]}
							castShadow >
						</mesh>
						<mesh
							geometry={nodes.Shuriken_Lame02.geometry}
							material={material}
							rotation={[Math.PI / 2, 0, 0]}
							castShadow >
						</mesh>
					</group>
				</group>
			</group>
		</>
	)
}
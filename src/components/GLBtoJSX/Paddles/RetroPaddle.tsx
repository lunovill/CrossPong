import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { PaddleProps } from '../../../types/Map';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { RetroSkillInfoProps } from '../../../store/physic/RetroPaddle';
import { DissolveMaterial } from '../DissolveMaterial';
import { RetroPowerEffect } from '../../Effects/RetroPowerEffect';

type GLTFResultRetroPaddle = GLTF & {
	nodes: {
		Cube330: Mesh
		Cube330_1: Mesh
		Cube330_2: Mesh
		Cube330_3: Mesh
	}
	materials: {
		['Material.018']: MeshStandardMaterial
		['Material.016']: MeshStandardMaterial
		['Material.017']: MeshStandardMaterial
		['Material.019']: MeshStandardMaterial
	}
};

interface RetroPaddleAnimationProps {
	paddleRef: MutableRefObject<Group | null>
}
export function RetroPaddleAnimation({ paddleRef }: RetroPaddleAnimationProps): ReactElement {
	useFrame((delta) => {
		if (paddleRef.current) {
			const paddle = paddleRef.current
			paddle.rotation.z = Math.sin(delta.clock.elapsedTime * 3) / 17;
			paddle.position.x = Math.sin(delta.clock.elapsedTime * 3) / 13;
			paddle.position.y = Math.cos(delta.clock.elapsedTime * 3) / 17;
		}
	});

	return <></>;
};


export default function RetroPaddle({ animation = true, effect = 'none', location = 1, position = { x: 0, y: 0, z: 0 }, velocity = { x: 0, y: 0, z: 0 }, skillInfo = undefined}: PaddleProps) {
	const { nodes, materials } = useGLTF('./assets/balls&paddles/retroPaddle.glb') as GLTFResultRetroPaddle;
	const groupRef = useRef<Group>(null);
	const paddleRef = useRef<Group>(null);
	const skill = useRef<RetroSkillInfoProps>();
	const [changeMaterial, setChangeMaterial] = useState<MeshStandardMaterial[]>();

	useEffect(() => {
		setTimeout(() => setChangeMaterial([
			materials['Material.016'].clone(),
			materials['Material.017'].clone(),
			materials['Material.018'].clone(),
			materials['Material.019'].clone()
		]), 3000);
	}, []);

	useFrame(() => {
		(groupRef.current) && groupRef.current.position.set(position.x, position.y, position.z);
		(skillInfo) && (skill.current = skillInfo as RetroSkillInfoProps);
	});

	return (
		<>
			{(animation) && <RetroPaddleAnimation paddleRef={paddleRef} />}
			{(effect === 'retroPower') && <RetroPowerEffect groupRef={groupRef} />}
			<group ref={groupRef} rotation={[-Math.PI / 2, -Math.PI / 2 * location, 0]}>
				<group ref={paddleRef} scale={[0.557, 0.25, 0.15]} dispose={null}>
					<mesh material={(changeMaterial) && changeMaterial[0]} geometry={nodes.Cube330_1.geometry} castShadow >
						<DissolveMaterial
							color="#127939"
							duration={3}
							baseMaterial={materials['Material.016']} />
					</mesh>
					<mesh material={(changeMaterial) && changeMaterial[1]} geometry={nodes.Cube330_2.geometry} castShadow>
						<DissolveMaterial
							color="#127939"
							duration={3}
							baseMaterial={materials['Material.017']} />
					</mesh>

					<mesh material={(changeMaterial) && changeMaterial[2]} geometry={nodes.Cube330.geometry} castShadow>
						<DissolveMaterial
							color="#127939"
							duration={3}
							baseMaterial={materials['Material.018']} />
					</mesh>
					<mesh material={(changeMaterial) && changeMaterial[3]} geometry={nodes.Cube330_3.geometry} castShadow>
						<DissolveMaterial
							color="#127939"
							duration={3}
							baseMaterial={materials['Material.019']} />
					</mesh>
				</group>
			</group>
		</>
	)
}
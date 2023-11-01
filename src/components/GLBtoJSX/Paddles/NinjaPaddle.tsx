import { useGLTF } from '@react-three/drei'
import { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { GLTFResult, PaddleProps } from '../../../types/Map';
import { Position } from '../../../store/Player';
import { Group, MeshStandardMaterial } from 'three';
import chroma, { Scale } from 'chroma-js';
import FlameShader from '../Shaders/FlamShader';
import gsap from 'gsap';
import { NinjaSkillInfoProps } from '../../../store/physic/NinjaPaddle';
import { DissolveMaterial } from '../DissolveMaterial';
import { RetroPowerEffect } from '../../Effects/RetroPowerEffect';

interface NinjaPaddleAnimationProps {
	groupRef: MutableRefObject<Group | null>,
	velocity: Position,
	collision?: number,
	location: -1 | 1
};

export function NinjaPaddleAnimation({ groupRef, velocity, collision, location }: NinjaPaddleAnimationProps): ReactElement {
	useEffect(() => {
		if (collision && groupRef.current) {
			gsap.to(groupRef.current.rotation, {
				duration: 0.15,
				y: - Math.PI / 2 * location,
				ease: "slow(0.7, 0.7, false)",

			});
			gsap.to(groupRef.current.rotation, {
				delay: 0.15,
				duration: 0.15,
				y: 0,
				ease: "slow(0.7, 0.7, false)",
			});
		}
	}, [collision])

	useFrame((state) => {
		if (groupRef.current) {
			const group = groupRef.current;

			group.rotation.x = Math.sin(state.clock.elapsedTime) / 10;
			group.rotation.x += (-velocity.y * 0.05 - group.rotation.x) * 0.1;
			group.position.z = Math.sin(state.clock.elapsedTime) / 10;
			group.rotation.y -= Math.sin(state.clock.elapsedTime) * 0.005;
		}
	});
	return <></>;
}

export default function NinjaPaddle({ animation = true, effect = 'none', location = 1, position = { x: 0, y: 0, z: 0 }, velocity = { x: 0, y: 0, z: 0 }, skillInfo = undefined, collision = undefined }: PaddleProps) {
	const { nodes, materials } = useGLTF('./assets/balls&paddles/Balls&Paddles.glb') as GLTFResult;
	const groupRef = useRef<Group>(null);
	const skill = useRef<NinjaSkillInfoProps>();
	const [index, setIndex] = useState<number>(0);
	const colorScale: Scale = chroma.scale(["red", "blue"]);
	const [changeMaterial, setChangeMaterial] = useState<MeshStandardMaterial>();

	useEffect(() => {
		setTimeout(() => setChangeMaterial(materials.Material__25.clone()), 3000);
	}, []);

	useFrame(() => {
		(groupRef.current) && groupRef.current.position.set(position.x, position.y, position.z);
		(skillInfo) && (skill.current = skillInfo as NinjaSkillInfoProps);
		if (skill.current) {
			const power: NinjaSkillInfoProps['power'] = skill.current.power;
			if (!power.isActive)
				setIndex(0);
			else if (power.factor < 0.9)
				setIndex(power.factor);
		}
	});

	return (
		<>
			{animation && <NinjaPaddleAnimation groupRef={groupRef} velocity={velocity} collision={collision} location={location} />}
			{(effect === 'retroPower') && <RetroPowerEffect groupRef={groupRef} />}
			<group ref={groupRef}>
				{
					(effect === 'none' && skill.current && skill.current.power.isActive) && <>
						<FlameShader position={[0, 0, 0.5]} scale={[0.6, 0.2, index * 1.8]} rotation={[-Math.PI / 2, 0, 0]} color1={colorScale(index).rgb()} />
					</>
				}
				<group
					scale={0.00005}
					position={[0, 0, 0]}
					rotation={[0, 0, location * Math.PI / 2]}
					dispose={null}>
					<mesh
						material={changeMaterial}
						geometry={nodes.Eventail.geometry}
						castShadow >
						{(!changeMaterial) && <DissolveMaterial
							color="#af1212"
							duration={3}
							baseMaterial={materials.Material__25} />}
					</mesh>
				</group>
			</group>
		</>
	)
}
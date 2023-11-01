import { useGLTF } from '@react-three/drei'
import { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { GLTFResult, PaddleProps } from '../../../types/Map';
import { Position } from '../../../store/Player';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { WesternSkillInfoProps } from '../../../store/physic/WesternPaddle';
import { AnimationSkillWestern } from '../Skills/MedivalSkills';
import { DissolveMaterial } from '../DissolveMaterial';
import { RetroPowerEffect } from '../../Effects/RetroPowerEffect';

interface MedievalPaddleAnimationProps {
	rightWheelRef: MutableRefObject<Mesh | null>,
	leftWheelRef: MutableRefObject<Mesh | null>,
	rouageRef: MutableRefObject<Mesh | null>,
	leverageRef: MutableRefObject<Mesh | null>,
	tigeRef: MutableRefObject<Mesh | null>,
	velocity: Position,
	location: -1 | 1
}

function WesternPaddleAnimation({ rightWheelRef, leftWheelRef, rouageRef, leverageRef, tigeRef, velocity, location }: MedievalPaddleAnimationProps): ReactElement {
	useFrame(() => {
		if (velocity.y) {
			if (rightWheelRef.current && leftWheelRef.current && rouageRef.current && leverageRef.current && tigeRef.current) {
				rightWheelRef.current.rotation.y += velocity.y / 4 * location;
				leftWheelRef.current.rotation.y += velocity.y / 4 * location;
				rouageRef.current.rotation.y = velocity.y * 0.1 + 0.25;
				leverageRef.current.rotation.y += (velocity.y * 0.1 + 0.25 - leverageRef.current.rotation.y) * 0.1;
				tigeRef.current.position.y = -velocity.y / 2 + 2;
			}
		}
	});
	return <></>;
}

export default function WesternPaddle({ animation = true, effect = 'none', location = 1, position = { x: 0, y: 0, z: 0 }, velocity = { x: 0, y: 0, z: 0 }, skillInfo = undefined }: PaddleProps) {
	const { nodes, materials } = useGLTF('./assets/balls&paddles/Balls&Paddles.glb') as GLTFResult;
	const groupRef = useRef<Group>(null);
	const skill = useRef<WesternSkillInfoProps>();

	const rightWheelRef = useRef<THREE.Mesh>(null);
	const leftWheelRef = useRef<THREE.Mesh>(null);
	const rouageRef = useRef<THREE.Mesh>(null);
	const leverageRef = useRef<THREE.Mesh>(null);
	const tigeRef = useRef<THREE.Mesh>(null);
	const [changeMaterial, setChangeMaterial] = useState<MeshStandardMaterial>();

	useEffect(() => {
		setTimeout(() => setChangeMaterial(materials.Material__25.clone()), 3000);
	}, []);

	useFrame(() => {
		(groupRef.current) && groupRef.current.position.set(position.x, position.y, groupRef.current.position.z);
		(skillInfo) && (skill.current = skillInfo as WesternSkillInfoProps);
	});

	return (
		<>
			{(animation) && <WesternPaddleAnimation
				location={location}
				rightWheelRef={rightWheelRef}
				leftWheelRef={leftWheelRef}
				rouageRef={rouageRef}
				leverageRef={leverageRef}
				tigeRef={tigeRef}
				velocity={velocity} />}
			{(effect === 'retroPower') && <RetroPowerEffect groupRef={groupRef} />}
			<group ref={groupRef} position={[5 * location, 0, 0]}>
				<group
					rotation={[Math.PI / 2, -Math.PI / 2 * location, 0]}
					scale={[0.052, 0.05, 0.04]}
					position={[0, 0, -0.2]}>
					{(skill.current) && <AnimationSkillWestern isUltiUsed={skill.current.power.isActive} refPaddle={groupRef} velocity={velocity.y} />}
					<mesh
						geometry={nodes.Handcar.geometry}
						material={(changeMaterial)}
						position={[-0.004, 5.142, -0.027]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={0.001}
						castShadow >
						{(!changeMaterial) && <DissolveMaterial
							color="#806e0e"
							duration={3}
							baseMaterial={materials.Material__25} />}
					</mesh>
					<group>{/*tige relou a animer */}
						<mesh
							geometry={nodes.Handcar_Tige.geometry}
							material={(changeMaterial)}
							ref={tigeRef}
							position={[24.96, 1.901, 0]}
							scale={0.01}>
							{(!changeMaterial) && <DissolveMaterial
								color="#806e0e"
								duration={3}
								baseMaterial={materials.Material__25} />}
						</mesh>
					</group>
					<group>{/* rouage */}
						<mesh
							ref={rouageRef}
							geometry={nodes.Handcar_Rouage.geometry}
							material={(changeMaterial)}
							position={[-1.245, 2.033, -0.026]}
							rotation={[-Math.PI / 2, 0, 0]}
							scale={0.001} >
							{(!changeMaterial) && <DissolveMaterial
								color="#806e0e"
								duration={3}
								baseMaterial={materials.Material__25} />}
						</mesh>
					</group>
					<group >{/* levier */}
						<mesh
							ref={leverageRef}
							geometry={nodes.Handcar_Baton.geometry}
							material={(changeMaterial)}
							position={[-0.022, 10.317, -0.026]}
							rotation={[-Math.PI / 2, 0.25, 0]}
							scale={0.001} >
							{(!changeMaterial) && <DissolveMaterial
								color="#806e0e"
								duration={3}
								baseMaterial={materials.Material__25} />}
						</mesh>
					</group>
					<group >{/* roue droite */}
						<mesh
							ref={rightWheelRef}
							geometry={nodes.Handcar_Roue.geometry}
							material={(changeMaterial)}
							position={[5.108, 0, 0]}
							rotation={[-Math.PI / 2, 0, 0]}
							scale={0.001}
							castShadow >
							{(!changeMaterial) && <DissolveMaterial
								color="#806e0e"
								duration={3}
								baseMaterial={materials.Material__25} />}
						</mesh>
					</group>
					<group>{/* roue gauche */}
						<mesh
							ref={leftWheelRef}
							geometry={nodes.Handcar_Roue02.geometry}
							material={(changeMaterial)}
							position={[-5.108, 0, 0]}
							rotation={[-Math.PI / 2, 0, 0]}
							scale={0.001}
							castShadow >
							{(!changeMaterial) && <DissolveMaterial
								color="#806e0e"
								duration={3}
								baseMaterial={materials.Material__25} />}
						</mesh>
					</group>
				</group>
			</group >
		</>
	)
}
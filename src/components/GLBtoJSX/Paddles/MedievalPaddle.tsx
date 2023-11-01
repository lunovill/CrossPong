import { useGLTF } from '@react-three/drei'
import { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { GLTFResult, PaddleProps } from '../../../types/Map';
import { Position } from '../../../store/Player';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { DissolveMaterial } from '../DissolveMaterial';
import { RetroPowerEffect } from '../../Effects/RetroPowerEffect';

interface MedievalPaddleAnimationProps {
	location: -1 | 1,
	rightWheelRef: MutableRefObject<Mesh | null>,
	leftWheelRef: MutableRefObject<Mesh | null>,
	rightChainRef: MutableRefObject<Mesh | null>,
	leftChainRef: MutableRefObject<Mesh | null>,
	ramRef: MutableRefObject<Mesh | null>,
	velocity: Position
}

function MedievalPaddleAnimation({ rightWheelRef, leftWheelRef, rightChainRef, leftChainRef, ramRef, velocity, location }: MedievalPaddleAnimationProps): ReactElement {
	useFrame(() => {
		if (rightWheelRef.current && leftWheelRef.current && rightChainRef.current && leftChainRef.current && ramRef.current) {
			rightWheelRef.current.rotation.y += velocity.y / 4 * location;
			leftWheelRef.current.rotation.y += velocity.y / 4 * location;
			rightChainRef.current.rotation.y += (velocity.y / 6 - rightChainRef.current.rotation.y) * 0.1;
			leftChainRef.current.rotation.y += (velocity.y / 6 - leftChainRef.current.rotation.y) * 0.1;
			ramRef.current.position.y += (Math.abs(velocity.y) / 6 + 4.321 - ramRef.current.position.y) * 0.1;
			ramRef.current.position.x += (-velocity.y - ramRef.current.position.x) * 0.1;
		}
	});
	return <></>;
}

export default function MedievalPaddle({ animation = true, effect = 'none', location = 1, position = { x: 0, y: 0, z: 0 }, velocity = { x: 0, y: 0, z: 0 } }: PaddleProps) {
	const { nodes, materials } = useGLTF('./assets/balls&paddles/Balls&Paddles.glb') as GLTFResult;
	const groupRef = useRef<Group>(null)
	const rightWheelRef = useRef<Mesh>(null);
	const leftWheelRef = useRef<Mesh>(null);
	const rightChainRef = useRef<Mesh>(null);
	const leftChainRef = useRef<Mesh>(null);
	const ramRef = useRef<Mesh>(null);
	const [changeMaterial, setChangeMaterial] = useState<MeshStandardMaterial>();

	useEffect(() => {
		setTimeout(() => setChangeMaterial(materials.Material__25.clone()), 3000);
	}, []);

	useFrame(() => (groupRef.current) && groupRef.current.position.set(position.x, position.y, position.z));

	return (
		<>
			{(animation) && <MedievalPaddleAnimation
				location={location}
				rightWheelRef={rightWheelRef}
				leftWheelRef={leftWheelRef}
				rightChainRef={rightChainRef}
				leftChainRef={leftChainRef}
				ramRef={ramRef}
				velocity={velocity} />}
			{(effect === 'retroPower') && <RetroPowerEffect groupRef={groupRef} />}
			<group ref={groupRef}>
				<group
					scale={0.047}
					rotation={[Math.PI / 2, -Math.PI / 2 * location, 0]}
					dispose={null}
					position={[0, 0, -0.23]}>
					<mesh
						material={changeMaterial}
						geometry={nodes.Belier_Tronc_Top.geometry}
						position={[0, 12.587, 0]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={0.001} >
						{(!changeMaterial) && <DissolveMaterial
							color="#0d4fa5"
							duration={3}
							baseMaterial={materials.Material__25} />}
					</mesh>
					<mesh
						material={changeMaterial}
						geometry={nodes.Belier.geometry}
						position={[0.05, 6.238, 0]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={0.001}
						castShadow >
						{(!changeMaterial) && <DissolveMaterial
							color="#0d4fa5"
							duration={3}
							baseMaterial={materials.Material__25} />}
					</mesh>
					<group>{/* chaines */}
						<mesh ref={rightChainRef}
							material={changeMaterial}
							geometry={nodes.Belier_Chaine.geometry}
							position={[5.947, 11.5, 0.011]}
							rotation={[-Math.PI / 2, 0, 0]}
							scale={0.001} >
							{(!changeMaterial) && <DissolveMaterial
								color="#0d4fa5"
								duration={3}
								baseMaterial={materials.Material__25} />}
						</mesh>
						<mesh ref={leftChainRef}
							material={changeMaterial}
							geometry={nodes.Belier_Chaine01.geometry}
							position={[-5.947, 11.5, 0.011]}
							rotation={[-Math.PI / 2, 0, 0]}
							scale={0.001} >
							{(!changeMaterial) && <DissolveMaterial
								color="#0d4fa5"
								duration={3}
								baseMaterial={materials.Material__25} />}
						</mesh>
					</group>
					<group>{/* tronc avec beliers */}
						<mesh ref={ramRef}
							material={changeMaterial}
							geometry={nodes.Belier_Belier.geometry}
							position={[0, 4.321, 0]}
							rotation={[-Math.PI / 2, 0, 0]}
							scale={0.001}
							castShadow >
							{(!changeMaterial) && <DissolveMaterial
								color="#0d4fa5"
								duration={3}
								baseMaterial={materials.Material__25} />}
						</mesh>
					</group>
					<group>{/* roue droite */}
						<mesh ref={rightWheelRef}
							material={changeMaterial}
							geometry={nodes.Belier_Roue.geometry}
							position={[8.655, 0, 0]}
							rotation={[-Math.PI / 2, 0, 0]}
							scale={0.001}
							castShadow >
							{(!changeMaterial) && <DissolveMaterial
								color="#0d4fa5"
								duration={3}
								baseMaterial={materials.Material__25} />}
						</mesh>
					</group>
					<group>{/* roue gauche */}
						<mesh
							material={changeMaterial}
							ref={leftWheelRef}
							geometry={nodes.Belier_Roue02.geometry}
							position={[-8.655, 0, 0]}
							rotation={[-Math.PI / 2, 0, 0]}
							scale={0.001} castShadow >
							{(!changeMaterial) && <DissolveMaterial
								color="#0d4fa5"
								duration={3}
								baseMaterial={materials.Material__25} />}
						</mesh>
					</group>
				</group>
			</group>
		</>
	)
}
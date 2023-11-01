import { GLTF } from 'three-stdlib'
import { MapProps } from '../../../types/Map'
import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import StarsDisappearEffect from '../../Animation/StarsDisepearEffect'
import { DissolveMaterial } from '../DissolveMaterial'
import { WesternSkillInfoProps } from '../../../store/physic/WesternPaddle'
import { WesternUltiAnimation } from '../Skills/WesternSkills'

type GLTFResultWestern = GLTF & {
	nodes: {
		Western_Bot: THREE.Mesh
		Western_Top: THREE.Mesh
		Western_CheminDeFer: THREE.Mesh
		Object001: THREE.Mesh
		Object006: THREE.Mesh
	}
	materials: {
		Material__25: THREE.MeshStandardMaterial
		Material__26: THREE.MeshStandardMaterial
	}
}

export default function WesternMap({ isMe, visible = true, colors = ['#2245e2', '#d92fe6', '#f0e51c', '#1cf030', '#ffffff'], location = 1, skillInfo = undefined, isInIntro = false }: MapProps) {
	const { nodes, materials } = useGLTF('./assets/maps/WesternMap.glb') as GLTFResultWestern;
	const [isVisible, setIsVisible] = useState(true);
	const [skill, setSkill] = useState<WesternSkillInfoProps>();

	useEffect(() => {
		(skillInfo) && setSkill(skillInfo as WesternSkillInfoProps);
	}, [skillInfo]);

	useEffect(() => {
		if (visible === true && isVisible === false)
			setIsVisible(visible);
	}
		, [visible]);

	return (
		<>
			{(isMe && isInIntro) && <StarsDisappearEffect visible={visible} location={location} colors={colors} />}
			{(skill) && skill.ulti.isActive && <WesternUltiAnimation/>}
			<group
				position={[3.665 * location, 0 * location, -0.94]}
				rotation={[Math.PI / 2, -Math.PI / 2 * location, 0]}
				scale={[3.205, 3.02, 3.02]}
				dispose={null}>
				<group visible={isVisible}>
					{
						isMe ?
							<mesh geometry={nodes.Western_Top.geometry}
								rotation={[-Math.PI / 2, 0, 0]}
								scale={[0.001, 0.00067, 0.001]}
								position={[-0.094, 0.498, -0.465]}
							>
								<DissolveMaterial
									onFadeOut={() => (setIsVisible(false))}
									color="#8a6c1a"
									visible={visible}
									duration={visible ? 1 : 3}
									baseMaterial={materials.Material__26} />

							</mesh>
							: <mesh geometry={nodes.Western_Top.geometry}
								rotation={[-Math.PI / 2, 0, 0]}
								scale={[0.001, 0.00067, 0.001]}
								position={[-0.094, 0.498, -0.465]}
								material={materials.Material__26}
							/>
					}
				</group>
				<mesh name="Western_Bot" geometry={nodes.Western_Bot.geometry} material={materials.Material__25} position={[0, 0.015, -0.011]} rotation={[-Math.PI / 2, 0, 0]} scale={0.001} receiveShadow />
				<mesh name="Western_CheminDeFer" geometry={nodes.Western_CheminDeFer.geometry} material={materials.Material__25} position={[0, 0.14, -0.441]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.001, 0.00066, 0.0003]} />
				<mesh name="Object001" geometry={nodes.Object001.geometry} material={materials.Material__25} position={[0, 0.015, 1.15]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.001, -0.00067, 0.001]} />
				<mesh name="Object001" geometry={nodes.Object001.geometry} material={materials.Material__25} position={[0, 0.015, -0.4]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.001, 0.00067, 0.001]} />
				<mesh name="Object006" geometry={nodes.Object006.geometry} material={materials.Material__25} position={[0, 0.015, -0.41]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.001, 0.00067, 0.001]} />
				<mesh name="Object006" geometry={nodes.Object006.geometry} material={materials.Material__25} position={[0, 0.015, 1.15]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.001, -0.00067, 0.001]} />
			</group>
		</>
	)
}


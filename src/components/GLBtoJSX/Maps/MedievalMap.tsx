import { GLTF } from 'three-stdlib'
import { MapProps } from '../../../types/Map'
import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import StarsDisappearEffect from '../../Animation/StarsDisepearEffect'
import { DissolveMaterial } from '../DissolveMaterial'
import { MedievalSkillInfoProps } from '../../../store/physic/MedievalPaddle'
import { AnimationSkillMedieval, AnimationUltiMedieval } from '../Skills/MedivalSkills'

type GLTFResultMedieval = GLTF & {
	nodes: {
		Merged_Fence_Plank_12: THREE.Mesh
		Merged_Fence_Plank_10: THREE.Mesh
	}
	materials: {
		Material__25: THREE.MeshStandardMaterial
		Material__26: THREE.MeshStandardMaterial
	}
}

export default function MedievalMap({ isMe = true, visible = true, colors = ['#2245e2', '#d92fe6', '#f0e51c', '#1cf030', '#ffffff'], location = 1, skillInfo = undefined, isInIntro=false }: MapProps) {
	const { nodes, materials } = useGLTF('./assets/maps/MedievalMap.glb') as GLTFResultMedieval
	const [isVisible, setIsVisible] = useState(true);
	const [skill, setSkill] = useState<MedievalSkillInfoProps>();

	useEffect(() => {
		(skillInfo) && setSkill(skillInfo as MedievalSkillInfoProps);
	}, [skillInfo]);

	useEffect(() => {
		if (visible === true && isVisible === false)
			setIsVisible(visible);
	}, [visible]);

	return (
		<>
			{(isMe  && isInIntro) && <StarsDisappearEffect visible={visible} location={location} colors={colors} />}
			<group
				position={[3.72 * location, 0 * location, -0.693]}
				rotation={[Math.PI / 2, -Math.PI / 2 * location, 0]}
				scale={[0.00322, 0.003, 0.003]} dispose={null}>
				<group scale={[220, 300, 300]} rotation={[Math.PI / 2, Math.PI / 1, -Math.PI / 2]} position={[-7, 270, -1800]}>
					{(skill) && skill.ulti.isActive && <AnimationUltiMedieval location={location} isActive={skill.ulti.stones} />}
					{(skill) && <AnimationSkillMedieval leftPillar={skill.power.left} rightPillar={skill.power.right} />}
				</group>
				<group>
					<mesh
						geometry={nodes.Merged_Fence_Plank_12.geometry}
						material={materials.Material__25}
						rotation={[-Math.PI / 2, 0, 0]}
						receiveShadow />
				</group>
				<group position={[0, 130, -950]} visible={isVisible}>
					{
						isMe ?
							<mesh geometry={nodes.Merged_Fence_Plank_10.geometry} rotation={[-Math.PI / 2, 0, 0]} >

								<DissolveMaterial
									onFadeOut={() => (setIsVisible(false))}
									color="#1acfc6"
									visible={visible}
									duration={visible ? 0.00000000001 : 3}
									baseMaterial={materials.Material__26} />
							</mesh>
							: <mesh geometry={nodes.Merged_Fence_Plank_10.geometry} rotation={[-Math.PI / 2, 0, 0]} material={materials.Material__26} />
					}
				</group>
			</group>
		</>
	)
}
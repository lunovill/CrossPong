import { GLTF } from 'three-stdlib'
import { MapProps } from '../../../types/Map'
import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import StarsDisappearEffect from '../../Animation/StarsDisepearEffect'
import { DissolveMaterial } from '../DissolveMaterial'

type GLTFResultNinja = GLTF & {
	nodes: {
		Pont_Asiatique_Scene_Retopo: THREE.Mesh
		Asie_Pont: THREE.Mesh
	}
	materials: {
		Material__26: THREE.MeshStandardMaterial
		Material__25: THREE.MeshStandardMaterial
	}
}

export default function NinjaMap({ isMe, visible = true, colors = ['#2245e2', '#d92fe6', '#f0e51c', '#1cf030', '#ffffff'], location = 1, isInIntro = false }: MapProps) {
	const { nodes, materials } = useGLTF('./assets/maps/NinjaMap.glb') as GLTFResultNinja;
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (visible === true && isVisible === false)
			setIsVisible(visible);
	}
		, [visible]);

	return (
		<>
			{(isMe && isInIntro) && <StarsDisappearEffect visible={visible} location={location} colors={colors} />}
			<group
				position={[4.59 * location, 0.75 * location, -0.67]}
				rotation={[Math.PI / 2, -Math.PI / 2 * location, 0]}
				scale={0.03}
				dispose={null}>
				<group visible={isVisible}>
					{
						isMe ?
							<mesh
								geometry={nodes.Pont_Asiatique_Scene_Retopo.geometry}
								position={[0, 0, -12]}
								scale={[1, 1, 0.85]} >
								<DissolveMaterial
									onFadeOut={() => (setIsVisible(false))}
									visible={visible}
									duration={visible ? 1 : 3}
									baseMaterial={materials.Material__26} />
							</mesh>
							: <mesh
								geometry={nodes.Pont_Asiatique_Scene_Retopo.geometry}
								position={[0, 0, -12]}
								scale={[1, 1, 0.85]}
								material={materials.Material__26} />
					}
				</group>
				<mesh
					geometry={nodes.Asie_Pont.geometry}
					material={materials.Material__25}
					receiveShadow />
			</group>
		</>
	)
}
import { GLTF } from 'three-stdlib'
import { MapProps } from '../../../types/Map'
import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import StarsDisappearEffect from '../../Animation/StarsDisepearEffect'
import { DissolveMaterial } from '../DissolveMaterial'
import { LinearFilter, Mesh, MeshStandardMaterial } from 'three'
import FireShader from '../Shaders/FireShader'

type GLTFResultRetro = GLTF & {
	nodes: {
		Object_0007: Mesh
		Object_0007_1: Mesh
		Plane003_1: Mesh
		Plane003_2: Mesh
		Plane003_3: Mesh
		Plane003_4: Mesh
		Plane003_5: Mesh
		Plane003_6: Mesh
		Plane003_7: Mesh
		Plane003_8: Mesh
		Plane003_9: Mesh
		Plane003_10: Mesh
	}
	materials: {
		pillar: MeshStandardMaterial
		['Material.010']: MeshStandardMaterial
		['Material.011']: MeshStandardMaterial
		['Material.015']: MeshStandardMaterial
		Material: MeshStandardMaterial
		['Material.012']: MeshStandardMaterial
		['Material.004']: MeshStandardMaterial
		['Material.001']: MeshStandardMaterial
		['Material.002']: MeshStandardMaterial
		['Material.013']: MeshStandardMaterial
		['Material.006']: MeshStandardMaterial
	}
}

export default function RetroMap({ isMe, visible = true, colors = ['#2245e2', '#d92fe6', '#f0e51c', '#1cf030', '#ffffff'], isInIntro = false, location = 1 }: MapProps) {
	const { nodes, materials } = useGLTF('./assets/maps/RetroMap.glb') as GLTFResultRetro
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (visible === true && isVisible === false)
			setIsVisible(visible);
	}
		, [visible]);

	Object.values(materials).forEach((material) => {
		if (material.map) {
			material.map.minFilter = LinearFilter;
			material.map.magFilter = LinearFilter;
			material.map.needsUpdate = true;
			material.map.anisotropy = 16;
		}
		if (material.normalMap) {
			material.normalMap.minFilter = LinearFilter;
			material.normalMap.magFilter = LinearFilter;
			material.normalMap.needsUpdate = true;
		}
	});
	return (
		<>
			{(isMe && isInIntro) && <StarsDisappearEffect visible={visible} location={location} colors={colors} />}
			<group
				position={[3.7 * location, 0 * location, -0.6]}
				rotation={[Math.PI / 2, -Math.PI / 2 * location, 0]}
				scale={[0.325, 0.3, 0.3]}
				dispose={null}>
				{(visible) && <FireShader position={[0, 3.8, -8]} scale={[1.8, 1.3, 1.3]} />}
				<group position={[7.54, 2.835, 0.969]} scale={[1, 3.016, 1]}>
					<mesh
						geometry={nodes.Object_0007.geometry}
						material={materials.pillar} />
					<mesh
						geometry={nodes.Object_0007_1.geometry}
						material={materials['Material.010']}
						receiveShadow />
				</group>
				<group position={[0.153, 8.479, -11.991]} visible={isVisible} >
					{
						isMe ?
							<>
								<mesh geometry={nodes.Plane003_1.geometry}>
									<DissolveMaterial
										onFadeOut={() => (setIsVisible(false))}
										color="#0be61d"
										visible={visible}
										duration={visible ? 1 : 3}
										baseMaterial={materials['Material.011']} />
								</mesh>
								<mesh geometry={nodes.Plane003_2.geometry} >
									<DissolveMaterial
										visible={visible}
										color="#0be61d"
										duration={visible ? 1 : 3}
										baseMaterial={materials['Material.015']} />
								</mesh>
								<mesh geometry={nodes.Plane003_3.geometry}>
									<DissolveMaterial
										visible={visible}
										color="#0be61d"
										duration={visible ? 1 : 3}
										baseMaterial={materials.Material} />
								</mesh>

								<mesh geometry={nodes.Plane003_4.geometry} >
									<DissolveMaterial
										visible={visible}
										color="#0be61d"
										duration={visible ? 1 : 3}
										baseMaterial={materials['Material.012']} />
								</mesh>
								<mesh geometry={nodes.Plane003_5.geometry} >
									<DissolveMaterial
										visible={visible}
										color="#0be61d"
										duration={visible ? 1 : 3}
										baseMaterial={materials['Material.004']} />
								</mesh>
								<mesh geometry={nodes.Plane003_6.geometry} >
									<DissolveMaterial
										visible={visible}
										color="#0be61d"
										duration={visible ? 1 : 3}
										baseMaterial={materials['Material.001']} />
								</mesh>
								<mesh geometry={nodes.Plane003_7.geometry} >
									<DissolveMaterial
										visible={visible}
										color="#0be61d"
										duration={visible ? 1 : 3}
										baseMaterial={materials['Material.002']} />
								</mesh>
								<mesh geometry={nodes.Plane003_8.geometry} >
									<DissolveMaterial
										visible={visible}
										color="#0be61d"
										duration={visible ? 1 : 3}
										baseMaterial={materials['Material.013']} />
								</mesh>

								<mesh geometry={nodes.Plane003_9.geometry} >
									<DissolveMaterial
										visible={visible}
										color="#0be61d"
										duration={visible ? 1 : 3}
										baseMaterial={materials['Material.006']} />
								</mesh>

								<mesh geometry={nodes.Plane003_10.geometry} >
									<DissolveMaterial
										visible={visible}
										color="#0be61d"
										duration={visible ? 1 : 3}
										baseMaterial={materials.pillar} />
								</mesh>
							</>
							:
							<>
								<mesh geometry={nodes.Plane003_1.geometry} material={materials['Material.011']} />
								<mesh geometry={nodes.Plane003_2.geometry} material={materials['Material.015']} />
								<mesh geometry={nodes.Plane003_3.geometry} material={materials.Material} />
								<mesh geometry={nodes.Plane003_4.geometry} material={materials['Material.012']} />
								<mesh geometry={nodes.Plane003_5.geometry} material={materials['Material.004']} />
								<mesh geometry={nodes.Plane003_6.geometry} material={materials['Material.001']} />
								<mesh geometry={nodes.Plane003_7.geometry} material={materials['Material.002']} />
								<mesh geometry={nodes.Plane003_8.geometry} material={materials['Material.013']} />
								<mesh geometry={nodes.Plane003_9.geometry} material={materials['Material.006']} />
							</>
					}
				</group>
			</group>
		</>
	)
}

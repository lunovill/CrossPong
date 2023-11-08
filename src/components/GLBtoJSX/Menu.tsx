import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Mesh } from 'three';
import {  useMeshState } from '../ContextBoard';

type GLTFResult = GLTF & {
	nodes: {
		AboutUS: Mesh;
		Profile: Mesh;
		Github: Mesh;
		Play: Mesh;
	};
	materials: {
		['Material.006']: THREE.MeshStandardMaterial
		['Material.001']: THREE.MeshStandardMaterial
		['Material.003']: THREE.MeshStandardMaterial
		['Material.002']: THREE.MeshStandardMaterial
	};
};


export function MenuFont() {

	const { meshRefs } = useMeshState();
	const { nodes, materials } = useGLTF("./assets/Menu3D.glb") as GLTFResult;

	return (
		<group ref={meshRefs.group_menu} dispose={null}>
			<mesh ref={meshRefs.AboutUS} geometry={nodes.AboutUS.geometry} material={materials['Material.006']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
			<mesh ref={meshRefs.Profile} geometry={nodes.Profile.geometry} material={materials['Material.001']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
			<mesh ref={meshRefs.Play} geometry={nodes.Play.geometry} material={materials['Material.003']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
			<mesh ref={meshRefs.Github} geometry={nodes.Github.geometry} material={materials['Material.002']} rotation={[Math.PI / 2, 0, 0]} />
		</group>
	);
}


import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Mesh, MeshStandardMaterial } from 'three';
import { useActualRefMenu, useMeshState } from '../ContextBoard';
import { Select } from '@react-three/postprocessing';

type GLTFResult = GLTF & {
	nodes: {
		AboutUS: Mesh;
		Profile: Mesh;
		ChatBox: Mesh;
		Play: Mesh;
	};
	materials: {
		["Material.006"]: MeshStandardMaterial;
		Material: MeshStandardMaterial;
		["Material.001"]: MeshStandardMaterial;
		["Material.002"]: MeshStandardMaterial;
	};
};

export function MenuFont() {

	const { meshRefs } = useMeshState();
	const { actualRef } = useActualRefMenu();
	const { nodes, materials } = useGLTF("./assets/font_menu.glb") as GLTFResult;

	const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.includes('Firefox');

	const MeshComponent = (ref: React.Ref<any>, geometry: any, material: any) => (
		<mesh ref={ref} geometry={geometry} material={material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
	);

	return (
		<group ref={meshRefs.group_menu} dispose={null}>
			{isFirefox ? (
				MeshComponent(meshRefs.AboutUS, nodes.AboutUS.geometry, materials["Material.006"])
			) : (
				<Select enabled={meshRefs.AboutUS === actualRef}>
					{MeshComponent(meshRefs.AboutUS, nodes.AboutUS.geometry, materials["Material.006"])}
				</Select>
			)}
			{isFirefox ? (
				MeshComponent(meshRefs.Profile, nodes.Profile.geometry, materials.Material)
			) : (
				<Select enabled={meshRefs.Profile === actualRef}>
					{MeshComponent(meshRefs.Profile, nodes.Profile.geometry, materials.Material)}
				</Select>
			)}
			{isFirefox ? (
				MeshComponent(meshRefs.ChatBox, nodes.ChatBox.geometry, materials["Material.001"])
			) : (
				<Select enabled={meshRefs.ChatBox === actualRef}>
					{MeshComponent(meshRefs.ChatBox, nodes.ChatBox.geometry, materials["Material.001"])}
				</Select>
			)}
			{isFirefox ? (
				MeshComponent(meshRefs.Play, nodes.Play.geometry, materials["Material.002"])
			) : (
				<Select enabled={meshRefs.Play === actualRef}>
					{MeshComponent(meshRefs.Play, nodes.Play.geometry, materials["Material.002"])}
				</Select>
			)}
		</group>
	);
}


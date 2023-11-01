import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import React from 'react';

type GLTFResult = GLTF & {
  nodes: {
    Cube?: THREE.Mesh;
    lp_shuriken_e_0?: THREE.Mesh;
    Projectile2HP_map1_0?: THREE.Mesh;
  };
  materials: {
    Material?: THREE.MeshStandardMaterial;
    Shuriken_lp?: THREE.MeshStandardMaterial;
    map1?: THREE.MeshStandardMaterial;
  };
};

export const ModelFortyTwo = React.forwardRef((props: JSX.IntrinsicElements['mesh'], ref: React.Ref<THREE.Mesh>) => {

  const { nodes, materials } = useGLTF('./assets/42.gltf') as GLTFResult

  if (!nodes.Cube || !materials.Material) {
    return null;
  }

  materials.Material.wireframe = true

  return (
    <mesh
      {...props}
      ref={ref}
      geometry={nodes.Cube.geometry}
      material={materials.Material}
      material-color="black" >
    </mesh>
  )
})
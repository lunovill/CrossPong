import {MeshStandardMaterial, Mesh} from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Ref, forwardRef } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    Cube?: Mesh;
    lp_shuriken_e_0?: Mesh;
    Projectile2HP_map1_0?: Mesh;
  };
  materials: {
    Material?: MeshStandardMaterial;
    Shuriken_lp?: MeshStandardMaterial;
    map1?: MeshStandardMaterial;
  };
};

export const ModelFortyTwo = forwardRef((props: JSX.IntrinsicElements['mesh'], ref: Ref<THREE.Mesh>) => {

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
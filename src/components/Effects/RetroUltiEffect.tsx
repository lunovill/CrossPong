import { MutableRefObject, ReactElement, useEffect } from "react";
import gsap from "gsap";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";

interface RetorUltiEffectProps {
  groupRef: MutableRefObject<Group | null>,
  collision: number
}

export function RetorUltiEffect({ collision, groupRef }: RetorUltiEffectProps): ReactElement {
  useEffect(() => {
    if (groupRef.current)
      groupRef.current.traverse((child) => (child instanceof Mesh) && (child.castShadow = false));
      
    return () => {
      if (groupRef.current)
        groupRef.current.traverse((child) => {
          if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
            gsap.to(child.material, {
              opacity: 1,
              duration: 0.5,
              onComplete: () => {
                child.material.transparent = false;
              }
            });
            (child instanceof Mesh) && (child.castShadow = true);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (groupRef.current)
      groupRef.current.traverse((child) => {
        if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
          child.material.opacity = 1;
          child.material.transparent = true;
        }
      });
  }, [collision])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
          child.material.opacity -= child.material.opacity * 0.07;
          child.material.transparent = true;
        }
      });
    }
  });

  return <></>;
}
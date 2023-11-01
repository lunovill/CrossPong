import { MutableRefObject, ReactElement } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

interface RetorUltiEffectProps {
  groupRef: MutableRefObject<Group | null>,
}

export function WesternUltiEffect({ groupRef }: RetorUltiEffectProps): ReactElement {
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.position.y += Math.cos(Date.now() * 0.05) * 0.01
        }
    })
  return <></>;
}
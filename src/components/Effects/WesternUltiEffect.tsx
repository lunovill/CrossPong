import { MutableRefObject, ReactElement } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

interface WesternUltiEffectProps {
  groupRef: MutableRefObject<Group | null>,
}

export function WesternUltiEffect({ groupRef }: WesternUltiEffectProps): ReactElement {
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.position.y += Math.cos(Date.now() * 0.05) * 0.01
        }
    })
  return <></>;
}
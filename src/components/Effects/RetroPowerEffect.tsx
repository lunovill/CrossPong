import gsap from "gsap";
import { MutableRefObject, ReactElement, useEffect } from "react";
import { Group, Mesh, MeshStandardMaterial } from "three";

interface RetroPowerEffectProps {
    groupRef: MutableRefObject<Group | null>
}

export function RetroPowerEffect({ groupRef }: RetroPowerEffectProps): ReactElement {
    useEffect(() => {
        if (groupRef.current)
            groupRef.current.traverse((child) => {
                if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
                    gsap.to(child.material, {
                        opacity: 0,
                        duration: 1,
                        onStart: () => {
                            child.material.transparent = true;
                            child.castShadow = false;
                        }
                    });
                    (child instanceof Mesh) && (child.castShadow = true);
                }
            });

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

    return <></>;
}
import { patchShaders } from "gl-noise";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import CSM from "three-custom-shader-material";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition; // use the world position instead of the uv
  void main() {
    vUv = uv;
    vPosition = position;
  }`;

const fragmentShader = patchShaders(/* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uThickness;
  uniform vec3 uColor;
  uniform float uProgress;
  
  
  void main() {
    gln_tFBMOpts opts = gln_tFBMOpts(1.0, 0.3, 2.0, 5.0, 1.0, 5, false, false);
    // float noise = gln_sfbm(vUv, opts); // THE ORIGINAL CODE FROM THE TUTORIAL
    float noise = gln_sfbm(vPosition, opts); //  use the world position instead of the uv for a better effect working on all objects
    noise = gln_normalize(noise);

    float progress = uProgress;

    float alpha = step(1.0 - progress, noise);
    float border = step((1.0 - progress) - uThickness, noise) - alpha;
    
    csm_DiffuseColor.a = alpha + border;
    csm_DiffuseColor.rgb = mix(csm_DiffuseColor.rgb, uColor, border);
  }`);

interface DissolveMaterialProps {
    baseMaterial: THREE.Material;
    thickness?: number;
    color?: string;
    intensity?: number;
    duration?: number;
    visible?: boolean;
    onFadeOut?: () => void;
    onFadeIn?: () => void;
}


export function DissolveMaterial({ baseMaterial, thickness = 0.1, color = "#360707", intensity = 50,
    duration = 0.01, visible = true, onFadeOut, onFadeIn }: DissolveMaterialProps) {

    const uniforms = useRef({
        uThickness: { value: 0.1 },
        uColor: { value: new THREE.Color(color).multiplyScalar(intensity) },
        uProgress: { value: 0 },
    });

    useEffect(() => {
        uniforms.current.uThickness.value = thickness;
        uniforms.current.uColor.value.set(color).multiplyScalar(intensity);
    }, [thickness, color, intensity]);


    useEffect(() => {
        if (visible) {
            gsap.to(uniforms.current.uProgress, {
                value: 1,
                duration: duration,
                ease: "power3.out",
                onStart: () => {
                    if (onFadeIn)
                        onFadeIn();
                }
            });
        } else {
            gsap.to(uniforms.current.uProgress, {
                value: 0,
                duration: duration,
                ease: "power3.out",
                onComplete: () => {
                    if (onFadeOut)
                        onFadeOut();
                }
            });
        }
    }, [visible]);

    if (Array.isArray(fragmentShader))
        console.error("patchShaders returned an array of strings, expected a single string.")
    else {
        return (
            <>
                <CSM
                    baseMaterial={baseMaterial}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms.current}
                    toneMapped={false}
                    transparent
                />
            </>
        );
    }
}
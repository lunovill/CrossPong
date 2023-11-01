import { ReactElement, useEffect, useRef, useState } from "react";
import { useFrame} from "@react-three/fiber";
import { Points, PointMaterial, useTexture } from '@react-three/drei'
import { Group, NearestFilter, PointsMaterial, Texture, Points as ThreePoints } from 'three';
import random from 'math-random'

import gsap from 'gsap';

const star_frame1 = [
    '/images/animation/anim1_frame1.png',
    '/images/animation/anim1_frame2.png',
    '/images/animation/anim1_frame3.png',
    '/images/animation/anim1_frame4.png',
    '/images/animation/anim1_frame3.png',
    '/images/animation/anim1_frame2.png',
];
const star_frame2 = [
    '/images/animation/anim2_frame1.png',
    '/images/animation/anim2_frame2.png',
    '/images/animation/anim2_frame3.png',
    '/images/animation/anim2_frame4.png',
    '/images/animation/anim2_frame3.png',
    '/images/animation/anim2_frame2.png',
];

function randomInSphere(n: number, radius: number): Float32Array {
    const points = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
        const r = radius * Math.cbrt(random());
        const theta = random() * 2 * Math.PI;
        const phi = Math.acos(2 * random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
}

interface StarsProps {
    color: string,
    delay?: number,
    duration: number,
    maps: Texture[],
    quantity: number,
    size: number
};

function Stars({ color, delay = 0, duration, maps, quantity, size }: StarsProps): ReactElement {
    const [sphere] = useState<Float32Array>(() => randomInSphere(quantity, 2));
    const [map, setMap] = useState<Texture>(maps[0]);
    const pointsRef = useRef<ThreePoints>(null);
    const textureIndex = useRef({ value: 0 });

    useEffect(() => {
        const updateTexture = () => {
            setMap(maps[Math.floor(textureIndex.current.value)]);
        };
        const tl = gsap.timeline({
            repeat: -1,
            delay: delay,
        });

        for (let i = 0; i < maps.length; i++) {
            tl.to(textureIndex.current, {
                value: i,
                duration: duration,
                onUpdate: updateTexture,
                roundProps: "value"
            });
        }

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <group>
            <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false} >
                <PointMaterial transparent color={color} map={map} size={size} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    );
}

interface StarsDisappearProps {
    visible: boolean,
    location: -1 | 1,
    colors: string[]
};

export default function StarsDisappearEffect({ visible, location, colors }: StarsDisappearProps) {
    const starsRef = useRef<Group>(null);

    const star1: Texture[] = star_frame1.map(f => {
        const t = useTexture(f);
        t.minFilter = NearestFilter;
        t.magFilter = NearestFilter;
        t.needsUpdate = true;
        return t;
    });
    const star2: Texture[] = star_frame2.map(f => {
        const t = useTexture(f);
        t.minFilter = NearestFilter;
        t.magFilter = NearestFilter;
        t.needsUpdate = true;
        return t;
    });
    const [size, setSize] = useState<number>(0);

    useEffect(() => {
        if (visible && starsRef.current) {
            setSize(0);
            starsRef.current.position.set(5.5 * location, 1, 1);
            starsRef.current.traverse((child) => {
                if (child instanceof ThreePoints) {
                    const material = child.material;
                    if (material instanceof PointsMaterial) {
                        material.opacity = 1
                    }
                }
            });
        }
    }, [visible]);

    useFrame((_, delta) => {
        if (!visible) {
            setSize(size + 0.002);
        }
        if (size > 0.12) {
            if (starsRef.current) {
                starsRef.current.traverse((child) => {
                    if (child instanceof ThreePoints) {
                        const material = child.material;
                        if (material instanceof PointsMaterial) {
                            material.opacity -= 0.01;
                            if (material.opacity <= 0) {
                                material.opacity = 0;
                            }
                        }
                    }
                });
            }
        }
        if (starsRef.current) {
            starsRef.current.rotation.x -= delta / 100;
            starsRef.current.position.x -= delta / 5;
            starsRef.current.position.y -= delta / 5;
        }
    });

    return <>
        <group ref={starsRef}>
            <Stars quantity={15} maps={star2} color={colors[0]} size={size} duration={Math.random() * 1.3 + 0.1} />
            <Stars quantity={10} maps={star2} color={colors[1]} size={size} duration={Math.random() * 1.3 + 0.1} />
            <Stars quantity={15} maps={star1} color={colors[2]} size={size} duration={Math.random() * 1.3 + 0.1} />
            <Stars quantity={10} maps={star1} color={colors[3]} size={size} duration={Math.random() * 1.3 + 0.1} />
        </group>
    </>
};

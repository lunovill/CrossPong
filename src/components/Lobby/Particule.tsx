import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.cjs'
import * as THREE from 'three'

const GenerateStars: React.FC = () => {
    const ref = useRef<THREE.Points<THREE.BufferGeometry>>(null)
    const [sphere] = useState<Float32Array>(() => new Float32Array(random.inSphere(new Float32Array(5000), { radius: 1.5 })));

    useFrame((_, delta) => {
        if (!ref.current) return
        ref.current.rotation.x -= delta / 10
        ref.current.rotation.y -= delta / 15
    })
    return (
        <>
            <group rotation={[0, 0, Math.PI / 4]}>
                <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} >
                    <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
                </Points>
            </group>
        </>

    )
}


const Stars: React.FC = () => {

    return (
        <Canvas>
            <GenerateStars />
        </Canvas>

    )
}

export default Stars;
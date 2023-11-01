import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertcylinder = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        vec3 pos = vec3(position.x/1.,position.y,position.z/1.);
        if(pos.y >= 1.87){
            pos = vec3(position.x*(sin((position.y - 0.6)*1.27)-0.16),position.y,position.z*(sin((position.y - 0.6)*1.27)-0.16));
        } else{
            pos = vec3(position.x*(sin((position.y/2. -  .01)*.11)+0.75),position.y,position.z*(sin((position.y/2. -  .01)*.11)+0.75));
        }
        gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
    }
`;

const fragcylinder = `
    varying vec2 vUv;
    uniform sampler2D perlinnoise;
    uniform vec3 color4;
    uniform float time;
    varying vec3 vNormal;

    vec3 rgbcol(vec3 col) {
        return vec3(col.r/255.0,col.g/255.0,col.b/255.0);
    }

    void main() {
        vec3 noisetex = texture2D(perlinnoise,mod(1.*vec2(vUv.y-time*2.,vUv.x + time*1.),1.)).rgb;    
        gl_FragColor = vec4(noisetex.r);

        if(gl_FragColor.r >= 0.5){
            gl_FragColor = vec4(rgbcol(color4),gl_FragColor.r);
        }else{
            gl_FragColor = vec4(0.);
        }
        gl_FragColor *= vec4(sin(vUv.y) - 0.1);
        gl_FragColor *= vec4(smoothstep(0.3,0.628,vUv.y));

    }

`;


interface WindShaderProps {
	position: [number, number, number];
	scale: [number, number, number];
	rotation?: [number, number, number];
	color1?: [number, number, number];
	speed?: number;
}

const WindShader = ({
	position,
	scale,
	rotation = [0, 0, 0],
	color1 = [147, 21, 44],
	speed = 100 }: WindShaderProps) => {
	const meshRef = useRef<THREE.Mesh>(null!);
	const uniformsRef = useRef({
		perlinnoise: {
			type: "t",
			value: new THREE.TextureLoader().load(
				"https://raw.githubusercontent.com/pizza3/asset/master/water-min.jpg"
			)
		},
		color4: {
			value: new THREE.Vector3(...color1)
		},
		time: {
			type: "f",
			value: 0.0
		},
		noise: {
			type: "t",
			value: new THREE.TextureLoader().load(
				"https://raw.githubusercontent.com/pizza3/asset/master/noise9.jpg"
			)
		}
	});

	useFrame(({ clock }) => {
		const delta = clock.getElapsedTime() * speed;
		uniformsRef.current.time.value = -delta / (1000 * 2);
		uniformsRef.current.color4.value = new THREE.Vector3(...color1);
	});

	return (
		<>
			<mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
				<cylinderGeometry args={[1, 0, 5.3, 50, 50, true]} />
				<shaderMaterial
					vertexShader={vertcylinder}
					fragmentShader={fragcylinder}
					uniforms={uniformsRef.current}
					transparent={true}
				/>
			</mesh>
		</>
	);
};




export default WindShader;

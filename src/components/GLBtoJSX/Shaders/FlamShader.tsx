import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertflame = `
    varying vec2 vUv;
    varying vec3 camPos;
    varying vec3 vNormal;
    varying vec3 nois;
    uniform sampler2D noise;
    uniform float time;

    void main() {
        vUv = uv;
        camPos = cameraPosition;
        vNormal = normal;
        vec3 pos = vec3(position.x/1.,position.y,position.z/1.);
        vec3 noisetex = texture2D(noise,mod(1.*vec2(vUv.y-time*2.,vUv.x + time*1.),1.)).rgb;
        if(pos.y >= 1.87){
            pos = vec3(position.x*(sin((position.y - 0.64)*1.27)-0.12),position.y,position.z*(sin((position.y - 0.64)*1.27)-0.12));
        } else{
            pos = vec3(position.x*(sin((position.y/2. -  .01)*.11)+0.79),position.y,position.z*(sin((position.y/2. -  .01)*.11)+0.79));
        }
        pos.xz *= noisetex.r;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
    }
`;

const fragflame = `
    varying vec2 vUv;
    uniform sampler2D perlinnoise;
    uniform sampler2D noise;
    uniform vec3 color4;
    uniform float time;
    varying vec3 camPos;
    varying vec3 vNormal;
    varying vec3 nois;

    vec3 rgbcol(vec3 col) {
        return vec3(col.r/255.0,col.g/255.0,col.b/255.0);
    }

      
    void main() {
        // vec3 noisetex = texture2D(perlinnoise,mod(1.*vec2(vUv.y-time*2.,vUv.x + time*1.),1.)).rgb;    
        // gl_FragColor += vec4(sin((vUv.y - time)*(20. + vUv.y)));
        vec3 noisetex = texture2D(noise,mod(1.*vec2(vUv.y-time*2.,vUv.x + time*1.),1.)).rgb;
        // nois = noisetex;
        gl_FragColor = vec4(noisetex.r);

        if(gl_FragColor.r >= 0.44){
            gl_FragColor = vec4(rgbcol(color4),gl_FragColor.r);
        }
        // else if(gl_FragColor.r >= 0.9){
        //     // gl_FragColor = vec4(rgbcol(color4),gl_FragColor.r)*0.5;
        // }
        else{
            gl_FragColor = vec4(0.);
        }
        gl_FragColor *= vec4(smoothstep(0.2,0.628,vUv.y));
        // gl_FragColor = vec4(vUv.y - 0.3 );
        // gl_FragColor = 1. - vec4(dot(normalize(vNormal),normalize(camPos)).r);
    }

`;

export const hexToRgb = (hex: string | undefined): [number, number, number] | undefined => {
	// Retirer le caractère "#" si présent
	if (hex === undefined) return undefined;
	hex = hex.replace(/^#/, '');

	// Convertir les valeurs hexadécimales en valeurs entières
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	return [r, g, b];
};


interface FlameShaderProps {
	position: [number, number, number];
	scale: [number, number, number];
	rotation?: [number, number, number];
	color1?: [number, number, number];
}

const FlameShader = ({
	position,
	scale,
	rotation = [0, 0, 0],
	color1 = [147, 21, 44] }: FlameShaderProps) => {
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
		const delta = clock.getElapsedTime() * 1000;
		uniformsRef.current.time.value = -delta / (3000 * 2);
		uniformsRef.current.color4.value = new THREE.Vector3(...color1);
	});

	return (
		<>
			<mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
				<cylinderGeometry args={[1, 0, 5.3, 50, 50, true]} />
				<shaderMaterial
					wireframe={false}
					vertexShader={vertflame}
					fragmentShader={fragflame}
					uniforms={uniformsRef.current}
					transparent={true}
				/>
			</mesh>
		</>
	);
};




export default FlameShader;

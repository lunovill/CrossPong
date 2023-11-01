import  { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vert = `
      varying vec3 vNormal;
      void main() {
        	vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }

`;
const frag = `
      #define NUM_OCTAVES 5
      uniform vec4 resolution;
      uniform vec3 color1;
      uniform vec3 color0;
      uniform float time;
      varying vec3 vNormal;

      float rand(vec2 n) {
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      float noise(vec2 p){
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);

        float res = mix(
          mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
          mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
        return res*res;
      }

      float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100);
        // Rotate to reduce axial bias
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
          v += a * noise(x);
          x = rot * x * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      vec3 rgbcol(float r, float g, float b) {
        return vec3(r/255.0,g/255.0,b/255.0);
      }

      float setOpacity(float r, float g, float b) {
        float tone = (r + g + b) / 3.0;
        float alpha = 1.0;
        if(tone<0.99) {
          alpha = 0.0;
        }
        return alpha;
      }

      void main()	{
       //this is for plane geometry
       //vec2 uv = gl_FragCoord.xy/resolution.xy ;

       vec2 uv = normalize( vNormal ).xy * 0.5 + 0.5; ;
       vec2 newUv = uv + vec2(0.0, -time*0.0004);
       float scale = 12.;
       vec2 p = newUv*scale;
       float noise = fbm( p + fbm( p ) );

       vec4 backColor = vec4(1.0 - uv.y) + vec4(vec3(noise*(1.0 - uv.y)),1.0);
       float aback = setOpacity(backColor.r,backColor.g,backColor.b);
       backColor.a = aback;
       backColor.rgb = rgbcol(color1.r,color1.g,color1.b);

       vec4 frontColor = vec4(1.08 - uv.y) + vec4(vec3(noise*(1.0 - uv.y)),1.0);
       float afront = setOpacity(frontColor.r,frontColor.g,frontColor.b);
       frontColor.a = afront ;
       frontColor.rgb = rgbcol(color0.r,color0.g,color0.b);

       // create edge
       frontColor.a = frontColor.a - backColor.a;

       if(frontColor.a>0.0){
        // show first color
        gl_FragColor = frontColor;
       } else {
        // show 2nd color
         gl_FragColor = backColor;
       }
      }

`;

interface FireShaderProps {
	position: [number, number, number];
	scale: [number, number, number];
	rotation?: [number, number, number];
	color1?: [number, number, number];
	color2?: [number, number, number];
}

const FireShader = ({
	position,
	scale,
	rotation = [0, 0, 0],
	color1 = [74, 30, 0],
	color2 = [201, 158, 72] }: FireShaderProps) => {

	const { size } = useThree();
	const meshRef = useRef<THREE.Mesh>(null!);

	const uniformsRef = useRef({
		time: { type: 'f', value: 10.0 },
		resolution: { value: new THREE.Vector2(size.width, size.height) },
		color1: { value: new THREE.Vector3(...color2) },
		color0: { value: new THREE.Vector3(...color1) },
	});

	useEffect(() => {
		uniformsRef.current.resolution.value = new THREE.Vector2(size.width, size.height);
	}, [size]);

	useFrame(({ clock }) => {
		const delta = clock.getElapsedTime() * 1000;
		uniformsRef.current.time.value = delta;
	});
	return (
		<>
			<mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
				<sphereGeometry args={[1, 32, 32]} />
				<shaderMaterial
					vertexShader={vert}
					fragmentShader={frag}
					uniforms={uniformsRef.current}
					transparent={true}
				/>
			</mesh>
		</>
	);
};




export default FireShader;

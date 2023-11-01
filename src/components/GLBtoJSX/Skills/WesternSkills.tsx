import { ReactElement, useMemo, useRef } from "react";
import { MAP_HEIGHT } from "../../../store/physic/config";
import { BufferGeometry, Float32BufferAttribute, Points } from "three";
import { useFrame } from "@react-three/fiber";
import { Position } from "../../../store/Player";

interface TornadoProps {
	position?: Position
	height?: number,
	radius?: number,
	size?: number
	rotation?: number
}

function Tornado({ position = { x: 0, y: 0, z: 0 }, height = 10, radius = 2.5, size = 0.05, rotation = 0.05 }: TornadoProps): ReactElement {
	const pointsRef = useRef<Points>(null)

	const geometry = useMemo(() => {
		const geom = new BufferGeometry();
		const positions = [];
		const colors = [];
	  
		for (let i = 0; i < 10000; i++) {
		  const angle = Math.random() * Math.PI * 2;
		  const r = Math.random() * radius;
		  const z = (Math.random() * 0.5 + 0.5) * height;
	  
		  const px = Math.cos(angle) * r * z / height;
		  const py = Math.sin(angle) * r * z / height;
		  const pz = z;
	  
		  positions.push(px, py, pz);
	  
		  colors.push(0.92, 0.82, 0.45);
		}
	  
		geom.setAttribute('position', new Float32BufferAttribute(positions, 3));
		geom.setAttribute('color', new Float32BufferAttribute(colors, 3));
	  
		return geom;
	  }, []);

	useFrame(() => {
		if (pointsRef.current) {
			pointsRef.current.rotation.z += rotation
			const positions = pointsRef.current.geometry.attributes.position;
			const time = Date.now();
			for (let i = 0; i < positions.count * 3; i += 3) {
				const z = positions.array[i + 2];
				positions.array[i + 1] += Math.cos(time * 0.005 + z) * 0.03 * Math.sign(rotation);
			}
			positions.needsUpdate = true;

		}
	});

	return <points ref={pointsRef} position={[position.x, position.y, position.z - height]} geometry={geometry}>
		<pointsMaterial
			size={size}
			opacity={0.6}
			transparent
			vertexColors={true}
		/>
	</points>;
}

export function WesternUltiAnimation(): ReactElement {
    return <>
        <Tornado position={{ x: 0, y: MAP_HEIGHT / 4, z: 4 }} />
        <Tornado position={{ x: 0, y: -MAP_HEIGHT / 4, z: 4 }} rotation={-0.05} />
    </>;
}
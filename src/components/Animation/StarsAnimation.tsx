import gsap from 'gsap';
import random from 'math-random'
import { useState, useRef, useEffect, ReactElement } from 'react'
import { RootState, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, useTexture } from '@react-three/drei'
import { Material, NearestFilter, Texture, Points as ThreePoints, Vector3 } from 'three';
import { useGame } from '../../store/hooks/useGame';

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
const star_frame3 = [
	'/images/animation/anim3_frame1.png',
	'/images/animation/anim3_frame2.png',
	'/images/animation/anim3_frame3.png',
	'/images/animation/anim3_frame4.png',
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
	const [sphere] = useState<Float32Array>(() => randomInSphere(quantity, 1.5));
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

	useFrame((_, delta) => {
		pointsRef.current && (pointsRef.current.rotation.x -= delta / 10);
		pointsRef.current && (pointsRef.current.rotation.y -= delta / 15);
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false} >
				<PointMaterial transparent color={color} map={map} size={size} sizeAttenuation={true} depthWrite={false} />
			</Points>
		</group>
	);
}

function ShootingStars({ color, delay = 0, duration, maps, quantity, size }: StarsProps): ReactElement {
	const [sphere] = useState<Float32Array>(() => randomInSphere(quantity, 1.5));
	const [map, setMap] = useState<Texture>(maps[0]);
	const pointsRef = useRef<ThreePoints>(null);
	const opacityRef = useRef<{ value: number }>({ value: 0 });
	const textureIndex = useRef<{ value: number }>({ value: 0 });

	useEffect(() => {
		const updateTexture = () => {
			setMap(maps[Math.floor(textureIndex.current.value)]);
		};
		const tl = gsap.timeline({
			repeat: -1,
			delay: delay,

		});

		tl.to(textureIndex.current, {
			onStart: () => { opacityRef.current.value = 1 },
			onComplete: () => { opacityRef.current.value = 0 },
			value: maps.length - 1,
			duration: duration * 4,
			onUpdate: updateTexture,
			roundProps: "value",
		}, `+=${delay * 2}`);

		return () => {
			tl.kill();
		};
	}, [maps]);

	useFrame((_, delta) => {
		pointsRef.current && ((pointsRef.current.material as Material).opacity = opacityRef.current.value);
		pointsRef.current && (pointsRef.current.rotation.x -= delta / 10);
		pointsRef.current && (pointsRef.current.rotation.y -= delta / 15);
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false} >
				<PointMaterial transparent color={color} map={map} size={size} sizeAttenuation={true} depthWrite={false} />
			</Points>
		</group>
	);
}

export interface StarsAnimationProps {
	refStars?: React.MutableRefObject<THREE.Group | null>,

}

export default function StarsAnimation({ refStars }: StarsAnimationProps): ReactElement {
	const { context } = useGame();
	const { camera } = useThree<RootState>();
	useEffect(() => {
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 1;
		camera.lookAt(new Vector3(0, 0, 0));
	}, []);

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
	const star3: Texture[] = star_frame3.map(f => {
		const t = useTexture(f);
		t.minFilter = NearestFilter;
		t.magFilter = NearestFilter;
		t.needsUpdate = true;
		return t;
	});

	return (
		<group ref={refStars}>
			<Stars quantity={75} maps={star1} color={context.starsColor[0]} size={0.01} duration={0.5} />
			<Stars quantity={60} maps={star1} color={context.starsColor[1]} size={0.04} delay={1} duration={0.375} />
			<Stars quantity={25} maps={star1} color={context.starsColor[4]} size={0.03} delay={2} duration={0.2} />
			<Stars quantity={75} maps={star2} color={context.starsColor[3]} size={0.01} duration={0.5} />
			<Stars quantity={5} maps={star2} color={context.starsColor[0]} size={0.07} duration={0.25} />
			<Stars quantity={60} maps={star2} color={context.starsColor[3]} size={0.04} delay={0.7} duration={0.375} />
			<Stars quantity={25} maps={star2} color={context.starsColor[1]} size={0.04} delay={1} duration={0.375} />
			<Stars quantity={60} maps={star2} color={context.starsColor[2]} size={0.03} delay={2} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color={context.starsColor[3]} size={0.05} delay={0.5} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color={context.starsColor[2]} size={0.12} delay={1} duration={0.2} />
			<ShootingStars quantity={3} maps={star3} color={context.starsColor[3]} size={0.09} delay={2} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color={context.starsColor[2]} size={0.03} delay={1.5} duration={0.2} />
			<ShootingStars quantity={3} maps={star3} color={context.starsColor[3]} size={0.03} delay={0.7} duration={0.2} />
			<ShootingStars quantity={1} maps={star3} color={context.starsColor[2]} size={0.05} delay={0.2} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color={context.starsColor[3]} size={0.09} delay={0.5} duration={0.2} />
			<ShootingStars quantity={3} maps={star3} color={context.starsColor[2]} size={0.05} delay={3} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color={context.starsColor[3]} size={0.09} delay={1.2} duration={0.2} />
		</group>
	);
}
import React, { useEffect, useRef, useState } from 'react'
import { Low_poly_rock } from '../Low_poly_rock'
import { useFrame } from '@react-three/fiber';
import { CustomEase } from "gsap/CustomEase";
import gsap from 'gsap';
import { MAP_HEIGHT } from '../../../store/physic/config';

gsap.registerPlugin(CustomEase);

export const AnimationUltiMedieval = ({ location, isActive }: { location: -1 | 1, isActive: boolean[] }) => {
	const [animation, setAnimation] = useState<boolean>(false);
	const [ambientAnimation, setAmbientAnimation] = useState<boolean>(false);
	const [isGone, setIsGone] = useState<boolean[]>([false, false, false, false]);

	const wall1 = useRef<THREE.Group>(null);
	const wall2 = useRef<THREE.Group>(null);
	const wall3 = useRef<THREE.Group>(null);
	const wall4 = useRef<THREE.Group>(null);

	useEffect(() => {
		if (!animation) {
			IntroAnimation(0.6, 2.6, [5.2 * location, MAP_HEIGHT * 0.2585 * 2 - MAP_HEIGHT * 0.393, -0.4], [5.5 * location, MAP_HEIGHT * 0.2585 * 2 - MAP_HEIGHT * 0.393, -0.1], wall1);
			IntroAnimation(0.9, 3.2, [5.2 * location, MAP_HEIGHT * 0.2585 * 1 - MAP_HEIGHT * 0.393, -0.4], [5.5 * location, MAP_HEIGHT * 0.2585 * 1 - MAP_HEIGHT * 0.393, -0.1], wall2);
			IntroAnimation(0.1, 3.7, [5.2 * location, MAP_HEIGHT * 0.2585 * 0 - MAP_HEIGHT * 0.393, -0.4], [5.5 * location, MAP_HEIGHT * 0.2585 * 0 - MAP_HEIGHT * 0.393, -0.1], wall3);
			IntroAnimation(1.1, 2.0, [5.2 * location, MAP_HEIGHT * 0.2585 * 3 - MAP_HEIGHT * 0.393, -0.4], [5.5 * location, MAP_HEIGHT * 0.2585 * 3 - MAP_HEIGHT * 0.393, -0.1], wall4);
			setAnimation(true)
		}
		setAmbientAnimation(true)
	}, []);

	useEffect(() => {
		if (!isActive[0] && !isGone[0]) {
			OutroAnimation(wall3);
			setIsGone(prev => [true, prev[1], prev[2], prev[3]]);
		}
		if (!isActive[1] && !isGone[1]) {
			OutroAnimation(wall2);
			setIsGone(prev => [prev[0], true, prev[2], prev[3]]);
		}
		if (!isActive[2] && !isGone[2]) {
			OutroAnimation(wall1);
			setIsGone(prev => [prev[0], prev[1], true, prev[3]]);
		}
		if (!isActive[3]&& !isGone[3]) {
			OutroAnimation(wall4);
			setIsGone(prev => [prev[0], prev[1], prev[2], true]);
		}
	}, [isActive]);

	const IntroAnimation = (delay1: number, delay2: number, position1: [number, number, number], position2: [number, number, number], ref: React.RefObject<THREE.Group>) => {

		if (ref.current) {
			gsap.to(ref.current!.position, {
				duration: 0.3,
				delay: delay1,
				x: position1[0],
				y: position1[1],
				z: position1[2],
				ease: "power2.inOut"
			});
			gsap.to(ref.current!.position, {
				duration: 1,
				delay: delay2,
				x: position2[0],
				y: position2[1],
				z: position2[2],
			});
			gsap.to(ref.current!.rotation, {
				duration: 1,
				delay: delay2,
				y: -Math.PI,
			});
		}
	}

	const OutroAnimation = (ref: React.RefObject<THREE.Group>) => {
		if (ref.current) {
			gsap.to(ref.current!.scale, {
				duration: 0.5,
				x: 0,
				y: 0,
				z: 0,
				ease: "power2.inOut"
			});
		}
	}

	useFrame((delta) => {


		if (ambientAnimation) {
			wall1.current!.rotation.x = Math.sin(delta.clock.elapsedTime * 3) / 10;
			wall1.current!.position.x = -5.5 - Math.sin(delta.clock.elapsedTime * 3) / 100;
			wall1.current!.position.y = 0.54 - Math.cos(delta.clock.elapsedTime * 3) / 10;
			wall2.current!.rotation.x = Math.sin(delta.clock.elapsedTime * 3) / 10;
			wall2.current!.position.x = -5.5 - Math.sin(delta.clock.elapsedTime * 3) / 10;
			wall2.current!.position.y = -0.59 - Math.cos(delta.clock.elapsedTime * 3) / 10;
			wall3.current!.rotation.x = Math.sin(delta.clock.elapsedTime * 3) / 10;
			wall3.current!.position.x = -5.5 - Math.sin(delta.clock.elapsedTime * 3) / 10;
			wall3.current!.position.y = -1.68 - Math.cos(delta.clock.elapsedTime * 3) / 10;
			wall4.current!.rotation.x = Math.sin(delta.clock.elapsedTime * 3) / 10;
			wall4.current!.position.x = -5.5 - Math.sin(delta.clock.elapsedTime * 3) / 10;
			wall4.current!.position.y = 1.67 - Math.cos(delta.clock.elapsedTime * 3) / 10;
		}
	});

	return (
		<>
			<Low_poly_rock ref={wall1} scale={[0.78, 0.6, 0.2]} rotation={[0, Math.PI / 2, Math.PI / 2]} />
			<Low_poly_rock ref={wall2} scale={[0.78, 0.6, 0.2]} rotation={[0, Math.PI / 2, Math.PI / 2]} />
			<Low_poly_rock ref={wall3} scale={[0.78, 0.6, 0.2]} rotation={[0, Math.PI / 2, Math.PI / 2]} />
			<Low_poly_rock ref={wall4} scale={[0.78, 0.6, 0.2]} rotation={[0, Math.PI / 2, Math.PI / 2]} />
		</>
	)
}

export const AnimationSkillMedieval: React.FC<{ leftPillar: boolean; rightPillar: boolean }> = ({ leftPillar, rightPillar }) => {


	const refLeft = useRef<THREE.Group>(null);
	const refRight = useRef<THREE.Group>(null);

	const DownAnimation = (meshRef: React.RefObject<THREE.Group>) => {
		if (meshRef.current) {
			gsap.to(meshRef.current.scale, {
				duration: 1,
				z: 1,
				ease: "elastic.out(1, 0.5)"
			});
		}
	}

	const UpAnimation = (meshRef: React.RefObject<THREE.Group>) => {
		if (meshRef.current) {
			gsap.to(meshRef.current.scale, {
				duration: 1,
				z: 0.1,
				ease: "elastic.out(1, 0.5)"
			});
		}
	}

	useEffect(() => {
		if (leftPillar) {
			DownAnimation(refLeft);
		} else {
			UpAnimation(refLeft);
		}
	}, [leftPillar]);

	useEffect(() => {
		if (rightPillar) {
			DownAnimation(refRight);
		} else {
			UpAnimation(refRight);
		}
	}, [rightPillar]);

	return <>
		<Low_poly_rock ref={refLeft} position={[-12.3, -1.19, -0.5]} scale={[0.6, 0.95, 0.1]} />
		<Low_poly_rock ref={refRight} position={[-12.3, 1.19, -0.5]} scale={[0.6, 0.95, 0.1]} />
	</>

}

export const AnimationSkillWestern: React.FC<{ isUltiUsed: boolean, refPaddle: React.RefObject<THREE.Group>, velocity: number }> = ({ isUltiUsed, refPaddle, velocity }) => {

	const Animation = (velocity: number, refPaddle: React.RefObject<THREE.Group>) => {

		//l'inertie du poids vers lavant/ puis arriere
		gsap.to(refPaddle.current!.rotation, {
			duration: 0.5,
			x: velocity * (0.35),
			z: 0.15
		});

		gsap.to(refPaddle.current!.rotation, {
			delay: 0.5,
			duration: 0.15,
			x: velocity * -0.1,

		});
		gsap.to(refPaddle.current!.rotation, {
			delay: 0.65,
			duration: 0.2,
			x: 0,

		});
		//rotation de desaxage sur les rails
		gsap.to(refPaddle.current!.rotation, {
			delay: 0.5,
			duration: 0.35,
			z: -0.1,
		})
		gsap.to(refPaddle.current!.rotation, {
			delay: 0.85,
			duration: 0.15,
			z: 0.05,
		})
		gsap.to(refPaddle.current!.rotation, {
			delay: 1,
			duration: 0.15,
			z: 0,
		})
		//saut
		gsap.to(refPaddle.current!.position, {
			duration: 2,
			z: 3,
			ease: CustomEase.create("custom", "M0,0,C0.124,0.044,0.138,0.076,0.138,0.076,0.138,0.076,0.193,0.114,0.22,0.08,0.272,0.012,0.272,-0.026,0.272,-0.026,0.272,-0.026,0.296,-0.026,0.338,0.036,0.408,0.036,0.391,0,0.436,0,0.455,0,0.426,-0.012,0.46,0.012,0.476,0.023,0.482,0.011,0.516,0.004,0.53,0.002,0.996,0,1,0")
		});
	}

	useEffect(() => {
		if (isUltiUsed) {
			Animation(velocity >= 0 ? 1 : -1, refPaddle);
		}
	}, [isUltiUsed]);
	return <></>;
}
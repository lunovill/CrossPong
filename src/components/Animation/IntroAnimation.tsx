import { useEffect, useMemo, useRef } from 'react';
import { useThree } from '@react-three/fiber'
import { useGame } from '../../store/hooks/useGame';
import { BoxGeometry, MeshStandardMaterial } from 'three';
import gsap from 'gsap';
import { TextManagerIntro } from './TextManager';

export default function IntroAnimation() {

	const { camera } = useThree();
	const { context, send } = useGame();
	const player = context.players[0];
	const opponent = context.players[1];
	const MapPlayer = player.Map();
	const MapOpponent = opponent.Map();
	const separator = useMemo(() => ({
		geometry: new BoxGeometry(0.2, 4.6, 2.5),
		material: new MeshStandardMaterial({ color: 'mediumpurple' })
	}), []);
	const refOpponent = useRef<THREE.Group>(null);
	const refPlayer = useRef<THREE.Group>(null);
	const refSepartor = useRef<THREE.Mesh>(null);



	useEffect(() => {
		refPlayer.current?.position.set(40 * player.location!, 0, -0.5 * player.location!);
		refOpponent.current?.position.set(40 * opponent.location!, 0, -0.5 * opponent.location!);
		refSepartor.current?.position.set(0, 0, 40);
		gsap.to(camera.position, { x: 0, y: 0, z: 17, duration: 2 });
		gsap.to(camera.position, { x: 0, y: -17, z: 4, duration: 2, delay: 2 });
		if (refPlayer.current && refOpponent.current && refSepartor.current) {
			gsap.to(refPlayer.current.position, { x: 0, y: 0, z: 0.5, duration: 4, delay: 0, ease: "circ.out" });
			gsap.to(refOpponent.current.position, { x: 0, y: 0, z: -0.5, duration: 4, delay: 0, ease: "circ.out" });
			gsap.to(refSepartor.current.position, { x: 0, y: 0, z: -1.6, duration: 4.4, delay: 0 });
			gsap.to(refPlayer.current.position, { x: 0, y: 0, z: 0, duration: 0.4, delay: 4.2, ease: "power4.in" });
			gsap.to(refOpponent.current.position, { x: 0, y: 0, z: 0, duration: 0.4, delay: 4.2, ease: "power4.in" });

			if (context.mode !== '2PLocal') {
				gsap.to(camera.position, { x: 17 * player.location!, y: 0, z: 4, duration: 2.5, delay: 5.2 });
				const width = window.innerWidth;
				let x;
				let z;

				if (width < 1200) {
					x = (-8.7 + (-10 + 8.5) * ((1200 - width + 250) / (1200 - 900))) * -context.players[0].location!;
					z = 1.6 + 2.2 * ((1200 - width + 250) / (1200 - 900));
				} else {
					x = -9.9 * -context.players[0].location!
					z = 3.8;
				}
				gsap.to(camera.position, { x: x, y: 0, z:z, duration:  2.3, delay: 7.7 });
			} else {
				gsap.to(camera.position, { y: -8, z: 10,  duration: 2.5, delay: 5.2 });
			}
		}
		if (context.mode !== '2PLocal') {
			setTimeout(() => {
				send({ type: 'intro' });
			}, 5300);
		}
		setTimeout(() => {
				send({ type: 'start', isBall: true });
		}, 10000);

	}, []);

	return <>
		<group ref={refPlayer}>
			<MapPlayer
				visible={context.isMapVisible}
				location={context.players[0].location}
				isMe={true}
				isInIntro={true} />
		</group>
		<mesh ref={refSepartor}
			position={[0, 0, -1.6]}
				geometry={separator.geometry}
				material={separator.material} />
		<group ref={refOpponent}>
			<MapOpponent
				location={context.players[1].location}
				isMe={false} />
		</group>
		<TextManagerIntro />
	</>;
}

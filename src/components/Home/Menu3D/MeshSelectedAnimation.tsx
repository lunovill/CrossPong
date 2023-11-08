import { useActualRefMenu, useMeshState } from '../../ContextBoard';
import { gsap } from 'gsap';
import { useEffect } from 'react';

export function MeshSelectedAnimation() { //ICI
	const { actualRef } = useActualRefMenu();
	const { meshRefs } = useMeshState();

	useEffect(() => {

		const tl = gsap.timeline({
			repeat: -1,
			yoyo: true,
		});
		if (actualRef.current !== meshRefs.Github.current) {
			tl.to(actualRef.current!.scale, {
				duration: 0.8,
				x: 0.011,
				y: 0.011,
				z: 0.011,
				ease: "power2.out",
			});
		}
		else {
			tl.to(actualRef.current!.scale, {
				duration: 0.8,
				x: 1.1,
				y: 1.1,
				z: 1.1,
				ease: "power2.out",
			});
		}

		return () => {
			tl.kill();
			if (!actualRef.current) return;
			if (actualRef.current === meshRefs.Github.current)
				actualRef.current.scale.set(1, 1, 1);
			else
				actualRef.current.scale.set(0.01, 0.01, 0.01); // Reinit la size
		};
	}, [actualRef]);

	return (
		<></>
	)
}

export default MeshSelectedAnimation;
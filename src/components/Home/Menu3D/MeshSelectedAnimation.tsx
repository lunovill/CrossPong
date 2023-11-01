import { useActualRefMenu } from '../../ContextBoard';
import { gsap } from 'gsap';
import { useEffect } from 'react';

export function MeshSelectedAnimation() {
    const { actualRef } = useActualRefMenu();

    useEffect(() => {
        
        const tl = gsap.timeline({
            repeat: -1,
            yoyo: true,
        });
        
        tl.to(actualRef.current!.scale, {
            duration: 0.8,
            x: 0.011,
            y: 0.011,
            z: 0.011,
            ease: "power2.out",
        });
        
        return () => {
            tl.kill(); // stop la timeline
            if (!actualRef.current) return;
            actualRef.current.scale.set(0.01, 0.01, 0.01); // Reinit la size
        };
    }, [actualRef]);

    return (
        <></>
    )
}

export default MeshSelectedAnimation;
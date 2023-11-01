import { useEffect } from 'react';
import { useState } from 'react';
import chroma from 'chroma-js';
import { useGame } from '../store/hooks/useGame';

const BackGroundTransition = () => {
    const { state, context } = useGame();
    const [currentBackgroundColor, setCurrentBackgroundColor] = useState(document.body.style.backgroundColor || '#353540');

    useEffect(() => {
        let startColor: string = currentBackgroundColor;
        let endColor: string;
        let t: number = 0;

        if (state === 'Mode')
            endColor = '#353540';
        else
            endColor = context.current!.mapInfo.secondaryColor;

        const scale = chroma.scale([startColor, endColor]);
        const increment = 0.05;

        const animateBackgroundColor = () => {
            if (t <= 1) {
                const newColor = scale(t).hex();
                document.body.style.backgroundColor = newColor;
                t += increment;
                requestAnimationFrame(animateBackgroundColor);
            } else
                setCurrentBackgroundColor(endColor);
        };
        animateBackgroundColor();

        return () => {
            document.body.style.backgroundColor = "endColor";
        };
    }, [state, context.current?.mapInfo]);

    return (
        <></>
    )
}

export default BackGroundTransition
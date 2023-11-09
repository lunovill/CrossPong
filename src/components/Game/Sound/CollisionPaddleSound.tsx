import { ReactElement, useEffect, useRef } from "react"
import { Html } from '@react-three/drei';
import { useInGameState } from "../../ContextBoard";

export default function CollisionPaddleSound({ collision }: { collision: number }): ReactElement {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { isPlaying } = useInGameState();

    useEffect(() => {
        if (isPlaying && collision && audioRef.current) {
            audioRef.current.play();
        }
    }, [collision]);

    return <Html>
        <audio ref={audioRef}>
            <source src={"/sound/HitSoundPaddle.mp3"} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    </Html>;
}
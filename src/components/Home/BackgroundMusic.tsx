import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useInGameState } from '../ContextBoard';

interface ContainerSoundIconProps {
	$isPlaying: boolean;
}
const ContainerSoundIcon = styled.div<ContainerSoundIconProps>`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
  border: none;
  border-radius: 5px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  user-select: none;

  @media (max-width: 1080px) {
	top: 5px;
    right: 5px;
  }

  @media (max-width: 968px) {
	right: auto;
	left: 15px;
	top: auto;
	bottom: 15px;
  }
`;

const IconSoundOn = styled.img`
  width: 100%;
  height: 100%;
`;

const IconSoundOff = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(-23.5%, -1.5%);
`;

const MusicPlayer: React.FC = () => {
	const { isPlaying, setIsPlaying, inGame } = useInGameState();
	const [currentMusic, setCurrentMusic] = useState<string>("/sound/IntroMusic.mp3");
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => { setIsPlaying(false); }, []);

	useEffect(() => {
		console.log(inGame);
		setCurrentMusic(inGame ? "/sound/BattleMusic.mp3" : "/sound/IntroMusic.mp3");
	}, [inGame]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.load();
			if (isPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
	}, [currentMusic, isPlaying]);

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<>
			<audio ref={audioRef} loop>
				<source src={currentMusic} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
			<ContainerSoundIcon onClick={togglePlay} $isPlaying={!inGame}>
				{isPlaying ? <IconSoundOff src="/UI/soundOn.png" /> : <IconSoundOn src="/UI/soundOff.png" />}
			</ContainerSoundIcon>
		</>
	);
};

export default MusicPlayer;
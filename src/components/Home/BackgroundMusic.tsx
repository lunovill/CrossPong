import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ContainerSoundIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 25px;
  z-index: 10;
  border: none;
  border-radius: 5px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  user-select: none;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef<HTMLAudioElement>();

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/sound/IntroMusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <ContainerSoundIcon onClick={togglePlay}>
        {isPlaying ? <IconSoundOff src="/UI/soundOff.png" /> :
		<IconSoundOn src="/UI/soundOn.png" />}
      </ContainerSoundIcon>
    </>
  );
};

export default MusicPlayer;

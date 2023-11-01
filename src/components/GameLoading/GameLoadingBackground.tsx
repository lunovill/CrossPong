import styled from 'styled-components'

interface BackgroundProps {
  $bgImage?: string;
}

const Background = styled.div<BackgroundProps>`
position: fixed;  
top: 0;
left: 0;
z-index: 0; 
animation: scroll 20s linear infinite;
background: url(${props => props.$bgImage});
background-size: 40%;
width: 100vw;
height: 100vh;

@keyframes scroll {
  100% {
    background-position: -200% -300%;
  }
}
`;

interface GameLoadingBackgroundProps {
  bgImage?: string;
}

export default function GameLoadingBackground(props: GameLoadingBackgroundProps) {
  return (
    <>
      <Background $bgImage={props.bgImage} />
    </>
  )
}
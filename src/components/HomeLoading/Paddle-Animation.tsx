import styled, { keyframes } from 'styled-components';

interface CubeProps {
  $scale: string;
  $bottom: string;
  $left: string;
  $animationPosition: [string, string, string, string];
  $zIndex: string;
}

const fadeIn = ($scale: string) => {
  return keyframes`
  0% {
    visibility: visible;
    transform: scale(0);
  }
  100% {
    transform: scale(${$scale});
  }
`;
};

const moveAnimation = ($animationPosition: [string, string, string, string]) => {
  return keyframes`
    0% {
      visibility: visible;
      left: ${$animationPosition[0]};
    }
    25% {
      left: ${$animationPosition[1]};
    }
    50% {
      left: ${$animationPosition[2]};
    }
    75% {
      left: ${$animationPosition[3]};
    }
    100% {
      left: ${$animationPosition[0]};
    }
  `;
};

const Cube = styled.div<CubeProps>`
  visibility: hidden;
  background: #8dad92;
  z-index: ${props => props.$zIndex};
  width: 80px;
  height: 20px;
  position: absolute;
  bottom: ${props => props.$bottom};
  left: ${props => props.$left};
  transform: scale(${props => props.$scale});
  margin: auto;
  margin-top: 20em;
  animation:
    ${props => fadeIn(props.$scale)} 2s forwards, 
    ${props => moveAnimation(props.$animationPosition)} 4s infinite;

  &::before {
    content: '';
    display: inline-block;
    background: #ffe57f;
    width: 40px;
    height: 10px;
    transform: skewX(30deg);
    position: absolute;
    top: -10px;
    left: 37px;
  }

  &::after {
    content: '';
    display: inline-block;
    background: #ffe57f;
    width: 50px;
    height: 10px;
    transform: skewX(-30deg);
    position: absolute;
    top:  -10px;
    left: 3px;
  }
`;

const cube1: CubeProps = {
  $scale: '0.5',
  $bottom: '75%',
  $left: '40%',
  $animationPosition: ['29%', '35%', '29%', '45%'],
  $zIndex: '0'
}

const cube2: CubeProps = {
  $scale: '1',
  $bottom: '30%',
  $left: '30%',
  $animationPosition: ['65%', '25%', '16%', '46%'],
  $zIndex: '2'
}

const PaddleLoadingAnimation = () => {
  return (
    <>
      <Cube {...cube1} />
      <Cube {...cube2} />
    </>
  );
}

export default PaddleLoadingAnimation;
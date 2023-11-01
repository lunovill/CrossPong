import styled, { keyframes } from 'styled-components';

interface LightProps {
  $scale: string;
  $animationPosition: [string, string, string, string];
  $bottom: string;
  $transform?: string;
  $zIndex?: string;
}

const fadeInLight = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
`;

const moveAnimation = ($animationPosition: [string, string, string, string]) => {
  return keyframes`
    0% {
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

const Light = styled.div<LightProps>`
  width: 80px;
  height: 150px;
  z-index: ${props => props.$zIndex};
  background: linear-gradient(to bottom, rgba(247, 186, 124, 0), rgba(247, 186, 124, 0.68));
  position: absolute;
  transform: scale(${props => props.$scale}) ${props => props.$transform};
  bottom: ${props => props.$bottom};
  animation:
    ${fadeInLight} 2.5s forwards,
    ${props => moveAnimation(props.$animationPosition)} 4s infinite;
`;

const light1: LightProps = {
  $scale: '0.5',
  $animationPosition: ['29%', '35%', '29%', '45%'],
  $bottom: '77%',
  $transform: 'translateY(50%)',
  $zIndex: '-2'
}

const light2: LightProps = {
  $scale: '1',
  $animationPosition: ['65%', '25%', '16%', '46%'],
  $bottom: '30%',
  $transform: '',
  $zIndex: '2'
}

const PaddleLightAnimation = () => {
  return (
    <>
      <Light {...light1} />
      <Light {...light2} />
    </>
  );
}

export default PaddleLightAnimation;
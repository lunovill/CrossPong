import styled, { keyframes } from 'styled-components';

interface VerticalLineProps {
  $height: string;
  $left: string;
  $delay: string;
}

const generateDrawVerticalLineAnimation = (height: string) => keyframes`
  0% {
    height: 0;
  }
  100% {
    height: ${height};
  }
`;

const VerticalLine = styled.div<VerticalLineProps>`
  background: white;
  width: 1px;
  height: 0;
  position: absolute;
  animation-duration: 0.275s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  animation-delay: ${props => props.$delay};
  left: ${props => props.$left};
  bottom: 5%;  
  animation-name: ${props => generateDrawVerticalLineAnimation(props.$height)};
`;

export default function DownVerticalLineAnimation() {
  return (
    <>
      <VerticalLine $height="18.7%" $left="0%" $delay="0s" />
      <VerticalLine $height="18.7%" $left="20%" $delay="0.2s" />
      <VerticalLine $height="18.7%" $left="40%" $delay="0.29s" />
      <VerticalLine $height="18.7%" $left="60%" $delay="0.29s" />
      <VerticalLine $height="18.7%" $left="80%" $delay="0.2s" />
      <VerticalLine $height="18.7%" $left="99.6%" $delay="0s" />

    </>
  );
}
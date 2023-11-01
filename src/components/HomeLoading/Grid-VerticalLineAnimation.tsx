import styled, { keyframes } from 'styled-components';

interface VerticalLineProps {
  $height: string;
  $left: string;
  $transform: string;
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
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out-in;
  animation-delay: ${props => props.$delay};
  left: ${props => props.$left};
  bottom: 23.5%;  
  transform-origin: bottom;  
  transform: ${props => props.$transform};
  animation-name: ${props => generateDrawVerticalLineAnimation(props.$height)};
`;

export default function VerticalLineAnimation() {
  return (
    <>
      <VerticalLine $height="64.5%" $left="0%" $transform="rotate(33deg)" $delay="0.2s" />
      <VerticalLine $height="58%" $left="20%" $transform="rotate(21.3deg)" $delay="0.4s" />
      <VerticalLine $height="54%" $left="40%" $transform="rotate(7.3deg)" $delay="0.495s" />
      <VerticalLine $height="54%" $left="60%" $transform="rotate(-7.3deg)" $delay="0.495s" />
      <VerticalLine $height="58%" $left="80%" $transform="rotate(-21.3deg)" $delay="0.4s" />
      <VerticalLine $height="64.5%" $left="99.6%" $transform="rotate(-33deg)" $delay="0.2s" />

    </>
  );
}
import styled, { keyframes } from 'styled-components';

const generateDrawLineAnimation = (width: string) => keyframes`
  100% {
    width: ${width};
  }
`;

interface LineProps {

  $width: string;
  $bottom: string;
  $direction: "right" | "left";
  $delay: string;
  $value: string;
  $duration: string;
}

const HorizontalLine = styled.div<LineProps>`
  background: white;
  height: 2px;
  width: 0;
  position: absolute;
  animation-duration: ${props => props.$duration};
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  bottom: ${props => props.$bottom};
  ${props => props.$direction}: ${props => props.$value};
  animation-delay: ${props => props.$delay};
  animation-name: ${props => generateDrawLineAnimation(props.$width)};
`;

export default function HorizontalLineAnimation() {
  return (
    <>
      <HorizontalLine $width="100%" $bottom="5%" $direction="left" $value="0%" $delay="0s" $duration="1s" />
      <HorizontalLine $width="100%" $bottom="23%" $direction="right" $value="0%" $delay="0.1s" $duration="0.9s" />

      <HorizontalLine $width="76.5%" $bottom="41.0%" $direction="left" $value="11.7%" $delay="0.39s" $duration="0.72s" />
      <HorizontalLine $width="57.0%" $bottom="56.0%" $direction="right" $value="21.5%" $delay="0.54s" $duration="0.61s" />
      <HorizontalLine $width="41.4%" $bottom="68.0%" $direction="left" $value="29.3%" $delay="0.7s" $duration="0.5s" />
      <HorizontalLine $width="29.6%" $bottom="77.1%" $direction="right" $value="35.2%" $delay="1.1s" $duration="0.325s" />
    </>
  );
}
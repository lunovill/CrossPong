import styled from 'styled-components';

const Logo = styled.img`
  position: absolute;
  left: 15%;
  top: -50%;
  width: 70%;
  height: 70%;
  animation: heartbeat 2s infinite;
  animation-timing-function: linear;
  @keyframes heartbeat {
    0% {
      transform: scale(1);
      filter: grayscale(30%);
    }
    50% {
      transform: scale(1.1);
      filter: grayscale(0%);
    }
    100% {
      transform: scale(1);
      filter: grayscale(30%);
    }
  }
`

interface LogoAnimationProps {
  src: string;
  alt: string;
}

const LogoAnimation = (props: LogoAnimationProps) => {
  return (
    <Logo src={props.src} alt={props.alt} />
  )
}

export default LogoAnimation;
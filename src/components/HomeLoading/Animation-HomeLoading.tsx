import styled from 'styled-components';
import HorizontalLineAnimation from './Grid-HorizontalLineAnimation';
import VerticalLineAnimation from './Grid-VerticalLineAnimation';
import BallLoadingAnimation from './Ball-Animation';
import PaddleLoadingAnimation from './Paddle-Animation';
import DownVerticalLineAnimation from './Grid-DownVerticalLineAnimation';
import LogoAnimation from './Logo-Animation';
import PaddleLightAnimation from './Paddle-LightAnimation';
import LoadingBarAnimation from './Percentage-Animation';

const Container = styled.div`
  width: 300px;
  position: relative;
`;
const srcLogo ="/images/CrossPongLogo.webp" 
const altLogo ="Cross Pong Logo"

const LineDrawingComponent = () => {
  return (
    <Container>
      <LogoAnimation src={srcLogo} alt={altLogo} />
      <VerticalLineAnimation />
      <HorizontalLineAnimation />
      <DownVerticalLineAnimation />
      <BallLoadingAnimation />
      <PaddleLightAnimation />
      <PaddleLoadingAnimation />
	  <LoadingBarAnimation />
    </Container>
  );
}

export default LineDrawingComponent;
import styled from 'styled-components';
import { useLoadingState } from '../ContextBoard';

const Container = styled.div`
  position: absolute;
  color: white;
  left: 45%;
  bottom: -5.5%; 
  font-family: 'NeueMachina-Regular', sans-serif; 
`

const LoadingBarAnimation = () => {
	const LoadingContext = useLoadingState();
  return (
    <Container>{String(LoadingContext)}%</Container>
  )
}

export default LoadingBarAnimation;
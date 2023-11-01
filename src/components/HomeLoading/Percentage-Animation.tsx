import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  color: white;
  left: 45%;
  bottom: -5.5%; 
  font-family: 'NeueMachina-Regular', sans-serif; 
`

const LoadingBarAnimation = () => {
  const loading = 0;
  return (
    <Container>{String(loading)}%</Container>
  )
}

export default LoadingBarAnimation;
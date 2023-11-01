import styled, { keyframes } from 'styled-components';
import { StyledButton } from '../../components/Profil/ProfileStyle';

const WelcomeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  border-radius: 15px;
`;

const WelcomeText = styled.p`
  font-size: 18px;
  text-align: center;
  margin: 20px;
`;


interface AuthProps {
  startAuthProcess: () => void;
}

export const ButtonAutentification: React.FC<AuthProps> = ({ startAuthProcess }) => {
  return (
    <WelcomeBox>

      <StyledButton onClick={startAuthProcess}>
        LOG IN WITH 42
      </StyledButton>
      <WelcomeText>Please log in to continue.</WelcomeText>
    </WelcomeBox>
  )
}

const dotAnimation = keyframes`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`;

const AuthInProgressContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const Dots = styled.div`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 24px;

  & div {
    position: absolute;
    top: 0;
    width: 24px;
    height: 24px;
    margin: 0 4px;
    border-radius: 50%;
    background: #333;
    animation: ${dotAnimation} 1.4s infinite ease-in-out both;
  }

  & div:nth-child(1) {
    left: 8px;
    animation-delay: -0.32s;
  }

  & div:nth-child(2) {
    left: 32px;
    animation-delay: -0.16s;
  }

  & div:nth-child(3) {
    left: 56px;
    animation-delay: 0s;
  }
`;

export const AuthInProgress: React.FC = () => {
  return (
    <AuthInProgressContainer>
      <Dots>
        <div></div>
        <div></div>
        <div></div>
      </Dots>
    </AuthInProgressContainer>
  );
};

import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SuccessMessage = styled.div<{ $isVisible: boolean }>`
  background-color: #72cb72;
  color: white;
  padding: 18px;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  width: 280px;
  top: 400px;
  left: 50%;
  font-weight: bold;
  transform: translate(-50%, -50%);
  animation: ${(props) => props.$isVisible ? css`${fadeIn} 0.5s ease-in-out` : css`${fadeOut} 0.5s ease-in-out`};
  animation-fill-mode: forwards;
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
`;

interface Props {
	isVisible: boolean;
	message: string;
}
const PopUpTwoFA = ({isVisible, message}:Props) => {

  return (
    <>
      <SuccessMessage $isVisible={isVisible}>
        {message}
      </SuccessMessage>
    </>
  );
};

export default PopUpTwoFA;

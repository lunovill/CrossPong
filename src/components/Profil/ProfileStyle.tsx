import styled, {keyframes} from 'styled-components';

interface WrittingContainerProps {
	readonly $color?: string;
	$size?: string;
	$weight?: string;
	$margin?: string;

}

export const WrittingContainer = styled.div<WrittingContainerProps>`
    width: 100%;
	margin-top: ${props => props.$margin || '20px'};
    text-align: center;
	font-family: 'InknutAntiqua', sans-serif;
	font-weight: ${props => props.$weight || '400'};
	color: ${props => props.$color || '#ffffff'};
	font-size: ${props => props.$size || '25px'};
	position: relative;
`;


export const StyledImage = styled.img<{ $isSelected: boolean }>`
  width: 75px;
  height: 75px;
  object-fit: cover;
  margin: 5px;
  border-radius: 5%;
  border: ${(props) => (props.$isSelected ? '2px dashed yellow' : 'none')};
  animation: ${(props) => (props.$isSelected ? 'blink-animation 1.5s infinite' : 'none')};

  @keyframes blink-animation {
    0% { border-color: #c49f28; }
    50% { border-color: transparent; }
    100% { border-color: #c49f28; }
  }
`;

interface StyledButtonProps {
	disabled?: boolean;
	$fontSize?: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
border: none;
outline: none;
background-color: ${(props: StyledButtonProps) => (props.disabled ? '#545455' : '#c49f28')};
padding: 10px 20px;
cursor: ${(props: StyledButtonProps) => (props.disabled ? 'not-allowed' : 'pointer')};
font-size: ${(props: StyledButtonProps) => (props.$fontSize || '12px')};
width: 250px;
font-weight: 700;
color: #fff;
border-radius: 5px;
transition: all ease 0.1s;
box-shadow: 0px 5px 0px 0px ${(props: StyledButtonProps) => (props.disabled ? '#090911' : '#28245e')};
font-family: 'InknutAntiqua', sans-serif;

&:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #a29bfe;
}
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
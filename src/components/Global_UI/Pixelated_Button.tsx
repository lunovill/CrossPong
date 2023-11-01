import styled from "styled-components";
import { PixelCorners2x2, PixelCorners3x3 } from "../../styles/HomeStyles";

type ButtonColorProps = {
  $color: string;
  $color_font?: string;
  $font_size?: string;
  $position?: string[];
}

const PlayButton = styled(PixelCorners2x2) <ButtonColorProps>`
	position: absolute;
	background-color: ${props => props.$color};
	color: ${props => props.$color_font};
	width: 464px;
	height: 72px;
  ${props => props.$position ? `left: ${props.$position[0]}; bottom: ${props.$position[1]};` : ''}
	font-family: "Yoster";
	
	font-size: ${props => props.$font_size};
	letter-spacing: 0.96px;
	display: flex;
	justify-content: center;
	align-items: center;
  cursor: pointer;
  &:hover {
        filter: drop-shadow(16px 16px 20px red) invert(85%);
        cursor: pointer;
    }
`;

const PlayButtonBackground = styled(PixelCorners3x3) <ButtonColorProps>`
	position: absolute;
	background-color: ${props => props.$color};
	width: 468px;
	height: 76px;
	left: 38px;
	bottom: 28px;
`;

interface Pixelated_ButtonProps {
  color_button: string;
  color_outline?: string;
  color_font?: string;
  font_size?: string;
  text: string;
  onClick?: () => void;
  position?: string[];
}

function Pixelated_Button( props: Pixelated_ButtonProps) {
  const ColorOutline = props.color_outline || 'black'
  const ColorFont = props.color_font || 'white'
  const FontSize = props.font_size || '36px'
  return (
    <>
      <PlayButtonBackground $color={ColorOutline} />
      <PlayButton
        $color={props.color_button} $color_font={ColorFont} $font_size={FontSize} $position={props.position}
        onClick={props.onClick}
      >
        {props.text}
      </PlayButton>
    </>

  )
}

export default Pixelated_Button
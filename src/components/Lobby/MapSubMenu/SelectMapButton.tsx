import styled, { css, keyframes } from 'styled-components';
import { PixelCorners1x1 } from '../../../styles/HomeStyles';
import { useGame } from '../../../store/hooks/useGame';
import { MapTheme } from '../../../types/machine';

type ButtonProps = {
    $left: number;
    $icon_url: string;
}

const Button = styled(PixelCorners1x1) <ButtonProps>`
    position: absolute;
    width: 96px;
    height: 96px;
    left: ${props => props.$left}px;
    bottom: 120px;
    image-rendering: pixelated;
    background-image: url(${props => props.$icon_url});
	cursor: pointer;
    z-index: 2;
    &:hover {
        filter: hue-rotate(270deg);
    }
`;

const blinkAnimation = keyframes`
    0% {
        opacity: 1;
    }
    25% {
        opacity: 0;
    } 
    50% {
        opacity: 1;
    }
    75% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

type ContainerProps = {
    $left: number;
    $isSelect: boolean;
}

const ButtonBorder = styled(PixelCorners1x1) <ContainerProps>`
    position: absolute;
    width: 112px;
    height: 112px;
    left: ${props => props.$left}px;
    bottom: 111px;
    z-index: 1;
    color: #FFAE61;
  
    ${props => props.$isSelect && css`
    --s: 30px; /* the size on the corner */
    --t: 4px;  /* the thickness of the border */
    --g: 25px; /* the gap between the border and image */
    
    padding: calc(var(--g) + var(--t));
    outline: var(--t) solid ;
    outline-offset: calc(-1 * var(--t));
    -webkit-mask: 
      conic-gradient(at var(--s) var(--s), #0000 75%, #000 0) 
      0 0 / calc(100% - var(--s)) calc(100% - var(--s)),
      linear-gradient(#000 0 0) content-box;

    animation: ${blinkAnimation} 2s infinite;
  `}
`;

type Props = {
    $icon_url: string;
    $left: number;
    $map: MapTheme;
}

const SelectMapButton = (props: Props) => {
    const { context, send } = useGame();

    return (
        <>
            <ButtonBorder $left={props.$left - 8} $isSelect={context.current!.mapInfo.id === props.$map} />
            <Button $left={props.$left} $icon_url={props.$icon_url} onClick={() => send({ type: 'chooseMap', map: props.$map })}>
            </Button>
        </>
    )
}

export default SelectMapButton;
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useGame } from "../../game/hooks/useGame";
import { Player } from "../../game/states/Player";
import { Html } from "@react-three/drei";
import UltimIcon from "../Game/HUD/Ultim";

interface TextContainerProps {
	$color?: string;
	$top: string;
	$left: string;
}

const Wrapper = styled.div`
  position: relative; // ou 'absolute', selon tes besoins
  width: 100vw;
  height: 100vh;
  // autres styles que tu veux appliquer
`;

const appear = keyframes`
  0% {
    top: -110%;
  }
  100% {
    top: -25%;
  }
`;

const appearText = keyframes`
0% {
    opacity: 0;
	top: 75%;
	

  }
  40% {
	opacity: 0;
  }
  88% {
    opacity: 1;
	
  }
  100% {
    opacity: 1;
	top: 0%;
  }
`;

const TextContainer = styled.div<TextContainerProps>`
	position: absolute;
	top: ${(props) => props.$top};
	left: ${(props) => props.$left};
	transform: translate(-50%, -50%);
	width: 350px;
	opacity: 0;

	font-size: 45px;
	font-family: 'inknutAntiqua', serif;
	color: ${(props) => props.$color || '#ecd2d2'};
	text-align: center;
	animation: ${appearText} 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.46)  forwards; // Power4.easeOut et 'forwards' pour maintenir le dernier état d'animation
`;


const ImageContainer = styled.div`
  position: absolute;
  top: -25%;
  left: 0%;
  transform: translate(-50%, -50%);
  animation: ${appear} 1s cubic-bezier(0.68, -0.55, 0.27, 2); /* Power4.easeOut */
`;

export default function UltiAnimation({ index }: { index: number }) {
	const { context, send } = useGame();
	const player: Player = context.players[index];

	useEffect(() => {
		if (context.mode !== '2PLocal') {
			setTimeout(() => {
				('send ulti');
				send({ type: 'ulti' });
			}, 1000);
		}
		setTimeout(() => {
			context.physic?.play();
		}, 3000);
	}, []);



	return (<>
		<Html>
			<Wrapper>
				<ImageContainer>
					<UltimIcon size="156px" isAvailable={true} map={player.mapInfo.id} />
				</ImageContainer>
				<TextContainer $top={'-5.1%'} $left={'0.1%'} $color="#c49b5f">
					An Ultimate has been Activated !
				</TextContainer>
				<TextContainer $top={'-5%'} $left={'0%'}>
					An Ultimate has been Activated !
				</TextContainer>
			</Wrapper>
		</Html>
	</>
	);
}
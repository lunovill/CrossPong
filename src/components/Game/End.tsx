import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useGame } from '../../game/hooks/useGame';
import { PixelCorners2x2, PixelCorners3x3 } from '../../styles/HomeStyles';
import { addScoreToSessionStorage } from '../MatchHistory';

interface ButtonProps {
	color?: string;
	top: string;
}


const PlayButtonBackground = styled(PixelCorners3x3) <ButtonProps>`
	position: absolute;
	background-color: ${props => props.color || '#000000'};
	text-align: center;
	top: ${props => props.top};
	width: 196px;
	height: 76px;
	left: calc(50% - 102px);
	z-index: 0;
	transform: translate(0px, 2px);
	cursor: pointer;

`;

const PlayButton = styled(PixelCorners2x2) <ButtonProps>`
	position: absolute;
	background-color: ${props => props.color || '#000000'};
	text-align: center;
	top: ${props => props.top};
	width: 192px;
	height: 72px;
	left: calc(50% - 96px);
    z-index: 1;
	font-size: 28px;
	display: flex;
    align-items: center; 
    justify-content: center;
	font-family: 'inknutAntiqua', serif;
	cursor: pointer;
	transition: 0.1;
	&:hover {
		transform: scale(1.05);
	}

`;

const ButtonGroup = styled.div<ButtonProps>`
	position: relative;
	width: 196px;
	height: 78px;
	left: calc(50% - 102px);
	top: ${props => props.top};
	cursor: pointer;
	&:hover {
		${PlayButton} {
			transform: scale(1.05);
		}
		${PlayButtonBackground} {
			transform: scale(1.05) translate(0px, 2px);
		}
	}
`;


export default function End(): ReactElement {
	const { context, send } = useGame();

	useEffect(() => {
		addScoreToSessionStorage(context.players[0].name,
			context.players[0].score,
			context.players[1].score,
			(context.players[1].name === 'Bot') ? context.players[1].mapInfo.nameIa : context.players[1].name);
	}, []);

	return (
		<>
			<ButtonGroup top={"calc(30% + 190px)"}>
				<PlayButtonBackground color={"#000000"} />
				<PlayButton color={"#e4d6d0"} onClick={() => {
					send({ type: 'leave' });
				}}>
					Leave
				</PlayButton>
			</ButtonGroup>
			<ButtonGroup top={"30%"}>
				<PlayButtonBackground color={"#000000"} />
				<PlayButton color={"#488f48"} onClick={() => {
					send({ type: 'restart' });
				}}>
					Restart
				</PlayButton>
			</ButtonGroup>

		</>
	);
}
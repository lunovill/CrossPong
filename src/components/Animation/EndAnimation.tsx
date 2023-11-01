import { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGame } from '../../store/hooks/useGame';
import { Html } from '@react-three/drei';
import styled from 'styled-components';

const Message = styled.div`
	position: absolute;
	font-size: 100px;
	font-family: 'inknutAntiqua', serif;
	color: #ecd2d2;
	text-align: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

`;

export default function EndAnimation() {
    const { camera } = useThree();
    const { send } = useGame();
	const { context } = useGame();
	const [didPlayerWin, setDidPlayerWin] = useState<boolean>(false);

	useFrame(() => {
		camera.position.y += 0.01;
	});

    useEffect(() => {
        camera.position.set(0, -17.85, 5);
		send({ type: 'setIsMapVisible', visible: true }) 
		if (context.players[0].score === 5  || context.players[1].score === 5) 
			setDidPlayerWin((context.players[0].score > context.players[1].score));
		else
			setDidPlayerWin(true);
        send({ type: 'end' });
        setTimeout(() => {
			send({ type: 'sendEnd' });
        }, 4000);
    }, []);

    return (<>
		<Html>
			<Message>
				{didPlayerWin ? 'You win! Bravo!' : 'You lose! Try again!'}
			</Message>
		</Html>
	</>);
}
import { ReactElement } from 'react';
import End from './End';
import Lobby from '../Lobby/Lobby';
import { useGame } from '../../store/hooks/useGame';
import HudGame from './HUD/HudGame';

export default function Interface(): ReactElement {
	const { state } = useGame();

	return <>
		{(['Mode', 'Map'].includes(state)) && <Lobby />}
		{(['Play', 'Animation'].includes(state)) && <HudGame />}
		{/* {(['Loading'].includes(state)) && <LoadingInterface />} */}
		{(['End'].includes(state)) && <End />}
	</>;
}

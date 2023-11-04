import Canvas from "../components/Game/Canvas";
import Experience from "../components/Game/Experience";
import { GameContextProvider } from "../game/hooks/useGame";
import Interface from '../components/Game/Interface';

function Game() {
	return (
		<GameContextProvider>
			<Canvas>
				<Experience />
			</Canvas>
			<Interface />
		</GameContextProvider>
	);
}

export default Game;
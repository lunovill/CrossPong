import Canvas from "../components/Game/Canvas";
import Experience from "../components/Game/Experience";
import { GameContextProvider } from "../store/hooks/useGame";
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
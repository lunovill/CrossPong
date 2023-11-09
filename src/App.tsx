import './styles/App.css';
import { useState, useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import BackgroundMusic from './components/Home/BackgroundMusic';
import { GlobalStyle } from './styles/HomeStyles';
import AnimatedPage from './components/AnimatedPage';
import { useGLTF } from '@react-three/drei';
import { LoadingContext, inGameContext } from './components/ContextBoard';
import HomeLoading from './pages/loadingPages/HomeLoading';
import CheckInfoSessionStorage from './components/Profil/CheckInfoSessionStorage';
import Home from './pages/Home';
import Game from './pages/Game';
import Profil from './pages/Profil';
import About from './pages/About';




const ChargingTime = 3000;
const intervalTime = 10;

function App() {
	const location = useLocation();
	const [inGame, setInGame] = useState<boolean>(false);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const storedProfilePic = sessionStorage.getItem('profilePic');
	const [isLoading, setIsLoading] = useState((storedProfilePic === null));

	useEffect(() => {
		const startTime = Date.now();
		const interval = setInterval(() => {
			const currentelapsedTime = Date.now() - startTime;
			setElapsedTime(prevTime => (prevTime + (intervalTime / (ChargingTime / 100))));
			if (currentelapsedTime >= ChargingTime) {
				clearInterval(interval);
				setIsLoading(false);
			}
		}, intervalTime);

		return () => {
			clearInterval(interval);
		}
	}, []);


	if (isLoading) {
		return (
			<LoadingContext.Provider value={elapsedTime.toFixed()}>
				<HomeLoading />
			</LoadingContext.Provider>
		)
	}

	return (
		<>
			<GlobalStyle />
			<inGameContext.Provider value={{ inGame, setInGame, isPlaying, setIsPlaying }}>
				<BackgroundMusic />
				<CheckInfoSessionStorage />
				<Routes location={location} key={location.pathname}>
					<Route index element={
						<Home />
					} />
					<Route path="/game" element={
						<Game />
					} />
					<Route path="/profile" element={
						<AnimatedPage endColor="#71ca71">
							<Profil />
						</AnimatedPage>
					} />
					<Route path="/about" element={
						<AnimatedPage endColor="#ca719a">
							<About />
						</AnimatedPage>
					} />
				</Routes>
			</inGameContext.Provider>
		</>
	)
}
export default App



useGLTF.preload('./assets/low_poly_rock-transformed.glb');
useGLTF.preload('./assets/42.gltf');
useGLTF.preload("./assets/Menu3D.glb");
useGLTF.preload("./assets/balls&paddles/Balls&Paddles.glb");
useGLTF.preload("./assets/balls&paddles/retroBall.glb");
useGLTF.preload("./assets/maps/MedievalMap.glb");
useGLTF.preload("./assets/maps/RetroMap.glb");
useGLTF.preload("./assets/maps/NinjaMap.glb");
useGLTF.preload("./assets/maps/WesternMap.glb");
useGLTF.preload("./assets/balls&paddles/retroPaddle.glb");


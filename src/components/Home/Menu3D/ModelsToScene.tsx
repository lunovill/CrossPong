import { ModelFortyTwo } from "../../GLBtoJSX/AssetsMenu";
import { MenuFont } from "../../GLBtoJSX/Menu";
import { degToRad } from "three/src/math/MathUtils.js";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from 'three';
import { RotatingMesh } from "./MenuRotating";
import SceneIntroAnimation from "./SceneIntroAnimation";
import MeshSelectedAnimation from "./MeshSelectedAnimation";
import NinjaBall from "../../GLBtoJSX/Balls/NinjaBall";
import RetroBall from "../../GLBtoJSX/Balls/RetroBall";
import MedievalBall from "../../GLBtoJSX/Balls/MedievalBall";
import WesternBall from "../../GLBtoJSX/Balls/WesternBall";

export function ModelsToScene() {

	const menu_obj = [
		useRef<Mesh>(null),
		useRef<Mesh>(null),
		useRef<Mesh>(null),
	]

	const size_obj = [
		0.025,
		0.2,
		0.2,
	]
	const [retroBallY, setRetroBallY] = useState(2.6);  // Valeur initiale
	const [MedievalBallY, setMedievalBallY] = useState(2.6);  // Valeur initiale
	const [medievalBallTheta, setMedievalBallTheta] = useState(0);
	const [stopTime, setStopTime] = useState<number | null>(null);
	const [isPaused, setIsPaused] = useState(false);
	const [medievalBallPosition, setMedievalBallPosition] = useState({ x: 0, y: 2.5, z: 4 });
	const [westernX, setWesternX] = useState(-2);
	const [WesternTurn, setWesternTurn] = useState(false);
	const [settingUpTurn, setSettingUpTurn] = useState(false);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		setMedievalBallY((time) % 2 * Math.PI);
		setRetroBallY(2.6 + Math.sin(time * 4) / 45);
		if (westernX >= 4.5)
			setWesternX(-5);
		else
			setWesternX(prev => (prev + 0.01));
		if (isPaused) {
			if (stopTime !== null && time - stopTime >= 3) {
				setSettingUpTurn(true);
				setIsPaused(false);
				setStopTime(null);
			}
		} else {
			const newTheta = (medievalBallTheta + 0.03) % (2 * Math.PI);
			setMedievalBallTheta(newTheta);

			const y = Math.cos(newTheta) + 0.6;
			const z = Math.sin(newTheta) + 6.3;
			const x = 0.8;
			setMedievalBallPosition({ x, y, z });
			if (newTheta >= 1 * Math.PI - 0.03 && settingUpTurn) {
				setWesternTurn(!WesternTurn);
				setSettingUpTurn(false);
			}
			if (newTheta >= 2 * Math.PI - 0.03) {
				setIsPaused(true);
				setStopTime(time);
			}
		}
	});

	useFrame(state => {

		const time = state.clock.getElapsedTime();

		if (menu_obj[0].current) {
			menu_obj[0].current.rotation.y += 0.01;
		}
		if (menu_obj[1].current) {
			menu_obj[1].current.rotation.z += 0.03;
			menu_obj[1].current.rotation.y = Math.sin(time / 5) / 3 + 2;
		}
		if (menu_obj[2].current) {
			menu_obj[2].current.rotation.z = Math.sin(time / 5) / 3;
			menu_obj[2].current.rotation.x = Math.cos(time / 5) / 3;
		}
	});

	return (
		<>
			<SceneIntroAnimation menu_obj={menu_obj} size_obj={size_obj} />
			<RotatingMesh >
				<MenuFont />
			</RotatingMesh>
			<MeshSelectedAnimation />
			<ModelFortyTwo
				ref={menu_obj[2]}
				position={[-3.2, -1.9, 1]}
				scale={size_obj[2]}
				rotation={[degToRad(19), degToRad(-100), degToRad(39)]}
			/>
			<NinjaBall
				position={{ x: -0.75, y: 2.5, z: 6.2 }}
				velocity={{ x: 2, y: -0.5, z: 0 }}
			/>
			<RetroBall
				position={{ x: 0.5, y: retroBallY, z: 7 }}
				velocity={{ x: -3, y: -3.5, z: 0 }}
				rotation={[-0.1, 0, 0]}
			/>
			{
				WesternTurn ?
					<WesternBall
						position={medievalBallPosition}
						velocity={{ x: 1, y: 0, z: 0 }}
						rotation={[-Math.PI / 1.8, 0, 0]}

					/>
					: <MedievalBall
						position={medievalBallPosition}
						velocity={{ x: 0, y: 0, z: 0 }}
						rotation={[-0.4, 1.4, MedievalBallY]}
					/>
			}


		</>

	);
}
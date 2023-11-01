import { Text } from "@react-three/drei";
import { useGame } from "../../store/hooks/useGame";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

const text: string[] = ["3", "2", "1", "FIGHT !"];
function TextThreeTwoOne() {
	const { context } = useGame();
	const reverseFont = context.players[0].location!;
	const [index, setIndex] = useState<number>(0);
	const [posY, setPosY] = useState<number>(10.6);

	useFrame(() => {
		if (posY >= 0.6) {
			setPosY(posY - 1);
		}
	});

	useEffect(() => {
		if (index <= 3) {
			setTimeout(() => {
				setPosY(10.6);
				setIndex(index + 1);
			}
				, 1000);
		}
	}, [index]);

	return (
		<Text
			color="#dfd6d6"
			fontSize={0.4}
			fillOpacity={1}
			maxWidth={20}
			lineHeight={1.2}
			textAlign="center"
			position={[0, 0, posY]}
			rotation={[0, reverseFont * Math.PI / 2, reverseFont * Math.PI / 2]}
			font='./fonts/inknutantiqua-bold-webfont.woff'
		>
			{text[index]}
		</Text>
	)
}

export default TextThreeTwoOne

import { Text } from '@react-three/drei'
import { MapTheme } from '../../types/machine';

interface TextDataProps {
	position: [number, number, number];
	opacity: number;
}

const textData: { [key in MapTheme]: (props: TextDataProps) => JSX.Element } = {
	[MapTheme.RETRO]: ({ position, opacity }: TextDataProps) => (
		<Text
			color="#487c30"
			fontSize={1}
			maxWidth={20}
			lineHeight={1.2}
			textAlign="center"
			fillOpacity={opacity}
			position={position}
			font='./fonts/yoster.woff'
		>
			Pixel Purgatory
		</Text>
	),
	[MapTheme.MEDIEVAL]: ({ position, opacity }: TextDataProps) => (
		<Text
			color="#adaff0"
			fontSize={1}
			maxWidth={20}
			lineHeight={1.2}
			textAlign="center"
			fillOpacity={opacity}
			position={position}
			font='./fonts/redfighter.woff'
		>
			Chivalry's Last Stand
		</Text>
	),
	[MapTheme.WESTERN]: ({ position, opacity }: TextDataProps) => (
		<Text
			color="#ca993e"
			fontSize={1}
			maxWidth={20}
			lineHeight={1.2}
			textAlign="center"
			fillOpacity={opacity}
			position={position}
			font='./fonts/albertson.woff'
		>
			CACTUS CANYON
		</Text>
	),
	[MapTheme.NINJA]: ({ position, opacity }: TextDataProps) => (
		<Text
			color="#ec937c"
			fontSize={1}
			maxWidth={20}
			lineHeight={1.2}
			textAlign="center"
			fillOpacity={opacity}
			position={position}
			font='./fonts/aasianninja.woff'
		>
			TEMPLE OF THE SILENT KUNOICHI
		</Text>
	),
};

type TextVersusProps = {
	themePlayer: MapTheme,
	themeOpponent: MapTheme,
	opacity: number
}
export const TextAnimationVersus = ({ themePlayer, themeOpponent, opacity }: TextVersusProps) => {
	return (
		<>
			{textData[themePlayer]({ position: [0, 1.2, -2], opacity })}
			<Text
				color="#030303"
				fontSize={1}
				maxWidth={20}
				fillOpacity={opacity}
				lineHeight={1.2}
				textAlign="center"
				position={[0, 0, -2]}
				font='./fonts/inknutantiqua-bold-webfont.woff'
			>
				VERSUS
			</Text>
			{textData[themeOpponent]({ position: [0, -1.2, -2], opacity })}
		</>
	)
}

interface TextProps {
	opacity: number;
	text: string;
	position: [number, number, number];
	rotation: [number, number, number];
}
export const SimpleText = ({ opacity, text, position, rotation }: TextProps) => {
	return (
		<Text
			color="#dfd6d6"
			fontSize={0.8}
			fillOpacity={opacity}
			maxWidth={20}
			lineHeight={1.2}
			textAlign="center"
			position={position}
			rotation={rotation}
			font='./fonts/inknutantiqua-bold-webfont.woff'
		>
			{text}
		</Text>
	)
}

export const TextFight = () => {
	return (
		<Text
			color="#dfd6d6"
			fontSize={0.8}

			maxWidth={20}
			lineHeight={1.2}
			textAlign="center"
			position={[0, -17, 3]}
			rotation={[Math.PI / 2, 0, 0]}
			font='./fonts/inknutantiqua-bold-webfont.woff'
		>
			FIGHT !
		</Text>
	)
}

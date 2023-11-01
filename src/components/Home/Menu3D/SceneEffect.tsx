import { EffectComposer, Outline } from '@react-three/postprocessing';
import { useThree } from "@react-three/fiber";

const SceneEffect = () => {
	const { size } = useThree();

	"#30c86a"
	return (
		<>
			<EffectComposer multisampling={64} autoClear={false}>

				<Outline
				
					visibleEdgeColor={0xFFFFFF}
					edgeStrength={5}
					pulseSpeed={0.05}
					width={size.width / 1.5}
					height={size.height / 1.5}
				/>
			</EffectComposer>
		</>
	)
}

export default SceneEffect

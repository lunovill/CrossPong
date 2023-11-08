import { useActualRefMenu, useMeshState } from "../../ContextBoard";
import { Plane } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

type Props = {
	setCursor: React.Dispatch<React.SetStateAction<string>>;
}

const MainBoutonMenu = (props: Props) => {
	const { meshRefs } = useMeshState();
	const navigate = useNavigate();
	const { AboutUS, Github, Play, Profile } = meshRefs;
	const tabRef = [Play, AboutUS, Github, Profile];
	const { actualRef } = useActualRefMenu();
	const tabRedirection = ['/game', '/about', 'https://github.com/pandamanxv3/Transcendance', '/profile'];

	const handlePointerOver = () => {
		props.setCursor('pointer');
	};

	const handlePointerOut = () => {
		props.setCursor('default');
	};

	const handleClick = () => {
		tabRef.map((ref, index) => {
			if (ref === actualRef) {
				if (tabRedirection[index].startsWith('http'))
					window.open(tabRedirection[index], '_blank');
				else
					navigate(tabRedirection[index]);
			}
		})
	};
	return (
		<>
			<Plane
				onPointerOver={handlePointerOver}
				onPointerOut={handlePointerOut}
				onClick={handleClick}
				visible={false}
				args={[3.4, 1, 1]}
				position={[0, 0, 0]} />
		</>
	)
}

export default MainBoutonMenu
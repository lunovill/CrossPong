import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { BoxGeometry, MeshStandardMaterial } from 'three';
import { useGame } from '../../store/hooks/useGame';
import { useFrame } from '@react-three/fiber';
import { SkillInfoProps } from '../../store/physic/Phisic';

type Info = { skill: SkillInfoProps };

export default function Area(): ReactElement {
	const { state, context } = useGame();
	const player = context.players[0];
	const opponent = context.players[1];
	const MapPlayer = player.Map();
	const MapOpponent = opponent.Map();
	const info = useRef<[Info, Info]>();
	const mesh = useMemo(() => ({
		geometry: new BoxGeometry(0.2, 4.6, 2.5),
		material: new MeshStandardMaterial({ color: 'mediumpurple' })
	}), []);
	const [, forceRender] = useState<number>(0);

	useFrame(() => {
		const newInfo: [Info, Info] = [
			{ skill: context.physic!.paddlesInfo[0].skill },
			{ skill: context.physic!.paddlesInfo[1].skill }
		];
		if (JSON.stringify(newInfo) !== JSON.stringify(info.current)) {
			info.current = newInfo;
			forceRender(prev => prev + 1);
		}

	});

	return <>
		<>
			<MapPlayer
				visible={context.isMapVisible}
				colors={context.starsColor}
				location={player.location}
				skillInfo={info.current && info.current[0].skill}
				isMe={true} />
			<mesh
				position={[0, 0, -1.6]}
				geometry={mesh.geometry}
				material={mesh.material} />
			<MapOpponent
				location={opponent.location}
				skillInfo={info.current && info.current[1].skill}
				isMe={false} />

		</>
	</>;
}

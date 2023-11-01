import { mapsAssets } from "../../data/models/MapObject";
import { AnimationStates, GameAction, MapTheme } from "../../types/machine";
import { Player } from "../Player";
import Physic from "../physic/Phisic";

const palettes: Record<MapTheme | 'default', string[]> = {
	'medieval': ["#990b0b", "#b14e16", "#6c6924", "#ffffff", "#7d5555"],
	'western': ["#000000", "#5a511a", "#5b5521", "#fefefe", "#56362c"],
	'ninja': ["#5141d1", "#3b2c85", "#807830", "#6f356f", "#9c6e6e"],
	'retro': ["#3e3f42", "#c6aa31", "#c02c2c", "#aec2b0", "#000000"],
	default: ['#2245e2', '#d92fe6', '#f0e51c', '#1cf030', '#ffffff']
};

export const changeCurrentAction: GameAction<'changeCurrent'> = (context, _) => {
	const player = context.players.find(p => p.id !== context.current!.id) as Player;
	return { starsColor: palettes[player.mapInfo.id], current: player };
};

export const changeStarsColorAction: GameAction<'changeStarsColor'> = (context, _) => {
	return { starsColor: palettes[context.current?.mapInfo.id || 'default'] };
};

export const chooseMapAction: GameAction<'chooseMap'> = (context, event) => {
	const starsColor = palettes[context.current!.mapInfo.id];
	const player = context.current as Player;
	player!.mapInfo = mapsAssets[event.map];
	return {
		starsColor: starsColor,
		current: player,
		players: context.players.map(p => (p.id === context.current!.id) ? player : p)
	};
};

export const chooseModeAction: GameAction<'chooseMode'> = (_, event) => {
	return { mode: event.mode };
};

export const endGameAction: GameAction<'end'> = (context, _) => {
	context.physic?.pause();
	return { animation: AnimationStates.END };
};

export const introGameAction: GameAction<'intro'> = () => {
	return { isMapVisible: false };
};

export const joinGameAction: GameAction<'join'> = (context, event) => {
	const player = new Player({ id: event.id, name: event.name });
	return {
		current: (!context.current) ? player : context.current,
		players: [...context.players, player]
	};
};

export const leaveGameAction: GameAction<'leave'> = (context, _) => {
	context.physic?.stop();
	return { current: undefined, players: [] };
};

export const powerGameAction: GameAction<'power'> = (context, event) => {
	return {
		players: context.players.map(p => {
			if (p.id === event.id) {
				p.power.start = Date.now();
				p.power.cooldown = (p.mapInfo.id === MapTheme.MEDIEVAL) ? 8000 :
					(p.mapInfo.id === MapTheme.WESTERN) ? 4000 :
						(p.mapInfo.id === MapTheme.NINJA) ? 12000 :
							(p.mapInfo.id === MapTheme.RETRO) ? 10000 : 0;
			}
			return p;
		})
	};
};

export const restartGameAction: GameAction<'restart'> = (context, _) => {
	return {
		players: context.players.map(p => {
			p.location = undefined;
			p.score = 0;
			p.ulti = false;
			p.canUseUlti = true;
			return p;
		})
	};
};

export const startGameAction: GameAction<'start'> = (context, _) => {
	const physic = ['2PLocal', 'IA'].includes(context.mode!) ? new Physic(context.players.find(p => p.location === -1)!.mapInfo.id, context.players.find(p => p.location === 1)!.mapInfo.id) : null;
	return { animation: AnimationStates.INTRO, physic: physic };
};

export const scoreGameAction: GameAction<'score'> = (context, event) => {
	context.physic?.pause();
	return {
		animation: AnimationStates.SCORE,
		players: context.players.map((p, i) => {
			(i === event.index) && (p.score += 1);
			if (event.isBall) {
				p.power = { ...p.power, start: 0, time: 0 };
				p.ulti = false;
			}
			return p;
		})
	};
};

export const startPhysicAction: GameAction<'start'> = (context, event) => {
	let i: number | undefined = undefined;
	if (context.animation === 'Ulti' || !event.isBall) { context.physic?.play(); }
	else { i = context.physic?.start(); }
	return { animation: undefined, current: (i !== undefined) ? context.players[i] : context.current };
};

export const setIsMapVisibleAction: GameAction<'setIsMapVisible'> = (_, event) => {
	return { isMapVisible: event.visible };
};

export const ultiGameAction: GameAction<'ulti'> = (context, event) => {
	context.physic?.pause();
	return {
		animation: AnimationStates.ULTI,
		players: context.players.map(p => {
			if (p.id === event.id && p.canUseUlti) {
				p.canUseUlti = false;
				setTimeout(() => {
					p.ulti = true;
				}, 150)
			};
			return p;
		})
	};
};

export const updateGameAction: GameAction<'update'> = (context, _) => {
	return {
		players: context.players.map((p) => {
			if (p.power.start) {
				const time = Date.now() - p.power.start;
				if (time >= p.power.cooldown) { p.power.start = 0; p.power.time = 0; }
				else { p.power.time = p.power.cooldown - time }
			}
			return p;
		})
	};
}

export const updatePlayerGameAction: GameAction<'updatePlayer'> = (context, event) => {
	return {
		players: context.players.map(p => {
			p.id === event.id && (p.location = event.location);
			return p;
		})
	};
};
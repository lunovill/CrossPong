import { mapsAssets } from "../../data/models/MapObject";
import { AnimationStates, GameAction, MapTheme } from "../../types/machine.type";
import { Player } from "./Player";
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
	const player = new Player(event.id, event.name, (context.players.length === 0) ? -1 : 1);
	return {
		current: (!context.current) ? player : context.current,
		players: [...context.players, player]
	};
};

export const leaveGameAction: GameAction<'leave'> = (context, _) => {
	context.physic?.stop();
	return { current: undefined, players: [] };
};

export const restartGameAction: GameAction<'restart'> = (context, _) => {
	context.physic?.restart();
	return { players: context.players.map(p => { p.score = 0; return p; }) };
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
			return p;
		})
	};
};

export const startPhysicAction: GameAction<'start'> = (context, _) => {
	const i: number | undefined = context.physic?.start();
	return { animation: undefined, current: (i !== undefined) ? context.players[i] : undefined };
};

export const setIsMapVisibleAction: GameAction<'setIsMapVisible'> = (_, event) => {
	return { isMapVisible: event.visible };
};

export const ultiGameAction: GameAction<'ulti'> = (context, _) => {
	context.physic?.pause();
	return { animation: AnimationStates.ULTI };
};

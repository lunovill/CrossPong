import { AnimationStates, GameStates, MapTheme, ModeType } from "../../types/machine.type";
import { createModel } from "xstate/lib/model";
import { canChangeCurrentGuard, canChooseModeGuard, canJoinGuard, canUltiGuard, isEndGameGuard } from "./guards";
import {
	changeCurrentAction,
	changeStarsColorAction,
	chooseMapAction,
	chooseModeAction,
	joinGameAction,
	leaveGameAction,
	restartGameAction,
	scoreGameAction,
	startPhysicAction,
	introGameAction,
	startGameAction,
	setIsMapVisibleAction,
	endGameAction,
	playPhysicAction,
	ultiGameAction
} from "./actions";
import { Player } from "./Player";
import { Group } from "three";
import { MutableRefObject } from "react";
import Physic from "../physic/Phisic";
import { LIFE } from "../game.constants";

export const GameModel = createModel({
	animation: undefined as AnimationStates | undefined,
	starsColor: ['#2245e2', '#d92fe6', '#f0e51c', '#1cf030', '#ffffff'] as string[],
	starsRef: null as MutableRefObject<Group| null> | null,
	mode: undefined as ModeType | undefined,
	current: undefined as Player | undefined,
	players: [] as Player[],
	physic: null as Physic | null,
	isMapVisible: true as boolean,
	victory: LIFE
}, {
	events: {
		changeCurrent: (id: Player['id']) => ({ id }),
		changeStarsColor: () => ({}),
		chooseMap: (map: MapTheme) => ({ map }),
		chooseMode: (mode: ModeType) => ({ mode }),
		intro: () => ({}),
		join: (id: Player['id'], name: Player['name']) => ({ id, name }),
		leave: () => ({}),
		end: () => ({}),
		play: () => ({}),
		restart: () => ({}),
		score: (index: number) => ({ index }),
		sendEnd: () => ({}),
		setIsMapVisible: (visible: boolean) => ({ visible }),
		setStarsRef: (starsRef: React.MutableRefObject<Group | null>) => ({ starsRef }),
		start: () => ({}),
		ulti: (index: number) => ({ index })
	}
});


export const GameMachine = GameModel.createMachine({
	id: 'game',
	predictableActionArguments: true,
	context: GameModel.initialContext,
	initial: GameStates.MODE,
	states: {
		[GameStates.MODE]: {
			entry: [GameModel.assign(changeStarsColorAction)],
			on: {
				chooseMode: {
					cond: canChooseModeGuard,
					actions: [GameModel.assign(chooseModeAction)],
					target: GameStates.MAP
				},
				join: {
					cond: canJoinGuard,
					actions: [GameModel.assign(joinGameAction)],
					target: GameStates.MODE
				},
				leave: {
					actions: [GameModel.assign(leaveGameAction)],
					target: GameStates.MODE
				},
				setStarsRef: {
					actions: [GameModel.assign({ starsRef: (_, event) => event.starsRef })],
					target: GameStates.MODE
				},
			}
		},
		[GameStates.MAP]: {
			entry: [GameModel.assign(changeStarsColorAction)],
			on: {
				changeCurrent: {
					cond: canChangeCurrentGuard,
					actions: [GameModel.assign(changeCurrentAction)],
					target: GameStates.MAP
				},
				chooseMap: {
					actions: [GameModel.assign(chooseMapAction)],
					target: GameStates.MAP
				},
				leave: {
					actions: [GameModel.assign(leaveGameAction)],
					target: GameStates.MODE
				},
				start: {
					actions: [GameModel.assign(startGameAction)],
					target: GameStates.ANIMATION
				}
			}
		},
		[GameStates.PLAY]: {
			on: {
				changeCurrent: {
					cond: canChangeCurrentGuard,
					actions: [GameModel.assign(changeCurrentAction)],
					target: GameStates.PLAY
				},
				end: {
					actions: [GameModel.assign(endGameAction)],
					target: GameStates.ANIMATION
				},
				leave: {
					actions: [GameModel.assign(leaveGameAction)],
					target: GameStates.MODE
				},
				score: {
					actions: [GameModel.assign(scoreGameAction)],
					target: GameStates.ANIMATION
				},
				ulti: {
					cond: canUltiGuard,
					actions: [GameModel.assign(ultiGameAction)],
					target: GameStates.ANIMATION
				}
			}
		},
		[GameStates.END]: {
			entry: [GameModel.assign(setIsMapVisibleAction)],
			on: {
				restart: {
					actions: [GameModel.assign(restartGameAction)],
					target: GameStates.MAP
				},
				leave: {
					actions: [GameModel.assign(leaveGameAction)],
					target: GameStates.MODE
				}
			}
		},
		[GameStates.ANIMATION]: {
			on: {
				changeCurrent: {
					cond: canChangeCurrentGuard,
					actions: [GameModel.assign(changeCurrentAction)],
					target: GameStates.ANIMATION
				},
				intro: {
					actions: [GameModel.assign(introGameAction)],
					target: GameStates.ANIMATION
				},
				end: {
					actions: [GameModel.assign({ animation: AnimationStates.END })],
					target: GameStates.ANIMATION
				},
				play: {
					actions: [GameModel.assign(playPhysicAction)],
					target: GameStates.PLAY
				},
				leave: {
					actions: [GameModel.assign(leaveGameAction)],
					target: GameStates.MODE
				},
				sendEnd: {
					actions: [GameModel.assign({ animation: undefined })],
					target: GameStates.END
				},
				start: [{
					cond: isEndGameGuard,
					actions: [GameModel.assign({ animation: AnimationStates.END })],
					target: GameStates.ANIMATION
				}, {
					actions: [GameModel.assign(startPhysicAction)],
					target: GameStates.PLAY
				}]
			}
		}

	}
});
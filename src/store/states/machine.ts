import { AnimationStates, GameStates, MapTheme, ModeType } from "../../types/machine";
import { createModel } from "xstate/lib/model";
import { canChangeCurrentGuard, canJoinGuard, canStartGuard, canUseUltiGuard, isEndGameGuard } from "./guards";
import { changeCurrentAction, changeStarsColorAction, chooseMapAction, chooseModeAction, joinGameAction, leaveGameAction, restartGameAction, scoreGameAction, startPhysicAction, updatePlayerGameAction, introGameAction, startGameAction, setIsMapVisibleAction, ultiGameAction, powerGameAction, updateGameAction, endGameAction } from "./actions";
import { Player } from "../Player";
import { Group } from "three";
import { MutableRefObject } from "react";
import Physic from "../physic/Phisic";

export const GameModel = createModel({
	animation: undefined as AnimationStates | undefined,
	starsColor: ['#2245e2', '#d92fe6', '#f0e51c', '#1cf030', '#ffffff'] as string[],
	starsRef: null as MutableRefObject<Group | null> | null,
	mode: undefined as ModeType | undefined,
	current: undefined as Player | undefined,
	players: [] as Player[],
	physic: null as Physic | null,
	isMapVisible: true as boolean,
	victory: 5,
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
		load: () => ({}),
		power: (id: Player['id']) => ({ id }),
		restart: () => ({}),
		score: (index: number, isBall: boolean) => ({ index, isBall }),
		sendEnd: () => ({}),
		setIsMapVisible: (visible: boolean) => ({visible}),
		setStarsRef: (starsRef: React.MutableRefObject<Group | null>) => ({ starsRef }),
		start: (isBall: boolean) => ({ isBall }),
		ulti: (id: Player['id']) => ({ id }),
		updatePlayer: (id: Player['id'], location: Player['location']) => ({ id, location }),
		update: () => ({})
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
				load: {
					target: GameStates.LOADING
				},
				leave: {
					actions: [GameModel.assign(leaveGameAction)],
					target: GameStates.MODE
				}
			}
		},
		[GameStates.LOADING]: {
			on: {
				changeCurrent: {
					cond: canChangeCurrentGuard,
					actions: [GameModel.assign(changeCurrentAction)],
					target: GameStates.LOADING
				},
				chooseMap: {
					actions: [GameModel.assign(chooseMapAction)],
					target: GameStates.LOADING
				},
				join: {
					cond: canJoinGuard,
					actions: [GameModel.assign(joinGameAction)],
					target: GameStates.LOADING
				},
				start: {
					cond: canStartGuard,
					actions: [GameModel.assign(startGameAction)],
					target: GameStates.ANIMATION
				},
				updatePlayer: {
					actions: [GameModel.assign(updatePlayerGameAction)],
					target: GameStates.LOADING
				},
				leave: {
					actions: [GameModel.assign(leaveGameAction)],
					target: GameStates.MODE
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
				power: {
					actions: [GameModel.assign(powerGameAction)],
					target: GameStates.PLAY
				},
				ulti: {
					cond: canUseUltiGuard,
					actions: [GameModel.assign(ultiGameAction)],
					target: GameStates.ANIMATION
				},
				update: {
					actions: [GameModel.assign(updateGameAction)],
					target: GameStates.PLAY
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
				end: {
					actions: [GameModel.assign({ animation: AnimationStates.END })],
					target: GameStates.ANIMATION
				},
				intro: {
					actions: [GameModel.assign(introGameAction)],
					target: GameStates.ANIMATION
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
				}],
				ulti: {
					target: GameStates.ANIMATION
				}
			}
		}

	}

});
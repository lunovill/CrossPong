import { GameModel } from '../store/states/machine';
import { ContextFrom, EventFrom } from 'xstate';

export enum GameStates {
    MODE = 'Mode',
    MAP = 'Map',
    LOADING = 'Loading',
    PLAY = 'Play',
    END = 'End',
    ANIMATION = 'Animation',
};

export enum AnimationStates {
    INTRO = 'Intro',
    SCORE = 'Score',
    ULTI = 'Ulti',
    END = 'End'
}

export enum ModeType {
    // MATCHMAKING = 'MatchMaking',
    IA = 'IA',
    LOCALPLAYER ='2PLocal',
};

export enum MapTheme {
    MEDIEVAL = 'medieval',
    WESTERN = 'western',
    NINJA = 'ninja',
    RETRO = 'retro'
};

export type Vector3 = { x: number, y: number, z: number };

export type GameContext = ContextFrom<typeof GameModel>;
export type GameEvents = EventFrom<typeof GameModel>;
export type GameEvent<T extends GameEvents['type']> = GameEvents & { type: T };
export type GameGuard<T extends GameEvents['type']> = (context: GameContext, event: GameEvent<T>) => boolean;
export type GameAction<T extends GameEvents['type']> = (context: GameContext, event: GameEvent<T>) => Partial<GameContext>;

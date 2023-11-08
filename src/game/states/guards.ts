import { GameGuard } from "../../types/machine.type";

export const canJoinGuard: GameGuard<'join'> = (context, event) => {
    return context.players.length < 2 && !context.players.find(p => p.id === event.id);
}

export const canChangeCurrentGuard: GameGuard<'changeCurrent'> = (context, event) =>{
    return context.current!.id !== event.id;
}

export const canChooseModeGuard: GameGuard<'chooseMode'> = (context, _) => {
    return context.players.length == 2;
}

export const canUltiGuard: GameGuard<'ulti'> = (context, event) => {
    return !context.players[event.index].utli;
}

export const isEndGameGuard: GameGuard<'start' | 'play'> = (context, _) => {
    return !!context.players.find(p => p.score === context.victory);
}

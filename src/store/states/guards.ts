import { GameGuard } from "../../types/machine";

export const canJoinGuard: GameGuard<'join'> = (context, event) => {
    return context.players.length < 2 && !context.players.find(p => p.id === event.id);
}

export const canChangeCurrentGuard: GameGuard<'changeCurrent'> = (context, event) =>{
    return context.current!.id !== event.id;
}

export const canUseUltiGuard: GameGuard<'ulti'> = (context, event) => {
    return context.players.find(p => p.id === event.id)!.canUseUlti;
}

export const canStartGuard: GameGuard<'start'> = (context, _) => {
    return context.players.length == 2;
}

export const isEndGameGuard: GameGuard<'start'> = (context, _) => {
    return !!context.players.find(p => p.score === context.victory);
}

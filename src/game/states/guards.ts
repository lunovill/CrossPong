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

export const isEndGameGuard: GameGuard<'start'> = (context, _) => {
    return !!context.players.find(p => p.score === context.victory);
}

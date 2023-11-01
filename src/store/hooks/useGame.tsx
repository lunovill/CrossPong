import { createContext, useContext } from 'react'
import { GameContext, GameEvents, GameStates } from '../../types/machine'
import { PropsWithChildren } from 'react';
import { ReactElement } from 'react';
import { useMachine } from '@xstate/react'
import { GameMachine } from '../states/machine';

type GameContextType = {
    state: GameStates,
    context: GameContext,
    send: (event: GameEvents) => void,
    can: (event: GameEvents) => boolean
}

const Context = createContext<GameContextType>({} as any);

export function useGame(): GameContextType {
    return useContext(Context);
};

export function GameContextProvider({ children }: PropsWithChildren): ReactElement {
    const [state, send] = useMachine(GameMachine);
    return <Context.Provider value={{
        state: state.value as GameStates,
        context: state.context,
        send: send,
        can: (event: GameEvents) => !!GameMachine.transition(state, event).changed
    }}>
        {children}
    </Context.Provider>
}
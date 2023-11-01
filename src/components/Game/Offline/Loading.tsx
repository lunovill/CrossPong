import { ReactElement, useEffect } from 'react';
import { useGame } from '../../../store/hooks/useGame';

export default function Loading(): ReactElement {
    const { send } = useGame();

    useEffect(() => {
        send({ type: 'updatePlayer', id: 'j1', location: -1 });
        send({ type: 'updatePlayer', id: 'j2', location: 1 });
        send({ type: 'start', isBall: true  });
    }, []);

    return <></>;
}
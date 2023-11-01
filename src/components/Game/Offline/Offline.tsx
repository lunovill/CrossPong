import { Suspense } from 'react';
import Loading from './Loading';
import World from './World';
import { useGame } from '../../../store/hooks/useGame';

export default function Offline() {
    const { state } = useGame();

    return <>
        {state === 'Loading' && <Loading />}
        {(state === 'Play' || state === 'Animation'|| state === 'End' ) && <Suspense><World /></Suspense>}
    </>;
}
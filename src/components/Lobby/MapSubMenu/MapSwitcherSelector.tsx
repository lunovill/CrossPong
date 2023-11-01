import styled from 'styled-components';
import SelectMap from './SelectMap';
import { PixelCorners2x2, PixelCorners3x3 } from '../../../styles/HomeStyles';
import { useGame } from '../../../store/hooks/useGame';
import { ModeType } from '../../../types/machine';
import { Player } from '../../../store/Player';

type TabProps = {
    $active: boolean;
    $color: string;
}

const TabContainer = styled.div`
  position: absolute;
  top: 2.5%;
  left: 33px;
  display: flex;
`;

type BackgroundTabProps = {
    $left: string;
}

const BackgroundTab = styled(PixelCorners3x3) <BackgroundTabProps>`
position: absolute;
	top: -2px;
  	left: ${props => props.$left};
	height: 54px;
  	width: 104px;
  	z-index: 1;
 	background-color: black;
`;

const Tab = styled(PixelCorners2x2) <TabProps>`
  padding: 5px;
  font-family: "Yoster";
  color: white;
  text-align: center;
  margin: 0 5px;
  margin-right: -10px;
  height: 50px;
  width: 100px;
  z-index: ${props => (props.$active ? '4' : '0')};
  cursor: pointer;
  background-color: ${props => (props.$color)};
`;

type playerSelection = 'j1' | 'j2';
const j1 = 'j1' as playerSelection;
const j2 = 'j2' as playerSelection;

const MapSwitcherSelector = () => {
    const { context, send } = useGame();
    const mode = context.mode as ModeType;
    const current = context.current as Player;

    if (['IA', '2PLocal'].includes(mode)) {
        return (
            <>
                <TabContainer>
                    {(current.id === 'j1') ? <BackgroundTab $left={'3px'} /> : <BackgroundTab $left={'98px'} />}
                    <Tab $active={current.id === j1} onClick={() => send({ type: 'changeCurrent', id: 'j1' })} $color={context.players[0].mapInfo.secondaryColor} >
                        Player 1
                    </Tab>
                    <Tab $active={current.id === j2} onClick={() => { send({ type: 'changeCurrent', id: 'j2' }) }} $color={context.players[1].mapInfo.secondaryColor}>
                        {mode == '2PLocal' ? 'Player 2' : 'IA'}
                    </Tab>
                </TabContainer>
                <SelectMap />
            </>
        );
    }
    else {
        return <SelectMap />
    }
}

export default MapSwitcherSelector;
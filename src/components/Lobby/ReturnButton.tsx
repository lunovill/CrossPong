import { useGame } from 'src/game/hooks/useGame';
import styled from 'styled-components';

const ReturnIcon = styled.div`
    width: 20px;
    height: 20px;
    background-color: red;
    z-index: 11; 
    `;

const ReturnButton = () => {
  const { send } = useGame();

  return (
    <>
      <ReturnIcon
        onClick={() => send({ type: 'leave' })} />
    </>
  );
};

export default ReturnButton;
import { useLobbyState } from '../ContextBoard'
import styled from 'styled-components';

const ReturnIcon = styled.div`
    width: 20px;
    height: 20px;
    background-color: red;
    z-index: 11; 
    `;

const ReturnButton = () => {
  const {setMode} = useLobbyState()

  const handleReturn = () => {
    setMode(undefined);
  }
  
  return (
    <>
    <ReturnIcon
        onClick={() => handleReturn()} />
</>
  );
};

export default ReturnButton;
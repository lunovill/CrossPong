import { useState, MouseEvent, ReactNode, FC } from 'react';
import styled from 'styled-components';

const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;
const Container = styled.div`
  position: relative;
  background-color: #e65437;
`;

interface RightClickMenuProps {
  children: ReactNode;
  RightClickComponent: FC<{ x: number; y: number }>;
}

const RightClickMenu: FC<RightClickMenuProps> = ({ children, RightClickComponent }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setVisible(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const closeContextMenu = () => {
    setVisible(false);
  };

  return (
    <Page onClick={closeContextMenu}>
      <Container onContextMenu={handleRightClick}>
        {children}
        {visible && <RightClickComponent x={position.x} y={position.y} />}
      </Container>
    </Page>
  );
};

export default RightClickMenu;

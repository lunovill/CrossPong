import styled from 'styled-components';
import SelectModeSubMenu from './ModeSubMenu/ModeSubMenu';
import SelectMapSubMenu from './MapSubMenu/MapSubMenu';
import { PixelCorners3x3 } from '../../styles/HomeStyles';
import { useGame } from '../../store/hooks/useGame';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);

`;

const Content = styled(PixelCorners3x3)`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #FFF8DC;
`;

const ShadowBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px 0px 60px black;
  z-index: -1; 
`;

const Menu = () => {
    const { state } = useGame();

    return state === 'Mode'
        ? (
            <Container>
                <ShadowBox />
                <Content>
                    <SelectModeSubMenu />
                </Content>
            </Container>
        )
        : (
            <>
                <Container>
                    <ShadowBox />
                    <Content>
                        <SelectMapSubMenu />
                    </Content>
                </Container>
            </>
        );
}

export default Menu;
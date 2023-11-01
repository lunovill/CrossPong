import { ReactElement } from 'react';
import styled from 'styled-components';
import Menu from './Menu';

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 544px 1fr;
    grid-template-rows: 1fr 566px 1fr;
    overflow-x: hidden;
    overflow-y: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    z-index: 1;
`;

const MenuDiv = styled.div`
    display: flex;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
`;

export default function Lobby(): ReactElement {
    return (
        <Container >
            <MenuDiv >
                <Menu />
            </MenuDiv>
        </Container>
    );
}
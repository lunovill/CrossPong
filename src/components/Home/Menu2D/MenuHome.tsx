import styled from 'styled-components'
import { MenuItem } from './MenuItem';


const MenuStyle = styled.div`
    font-size: 4rem;

    display: flex;
    flex-direction: column;
    list-style: none;
    user-select: none;
	
    @media (max-width: 1800px) {
		font-size: 3rem;
    }
	
		@media (max-width: 800px) {
			font-size: 2rem;
		}
`

interface MenuItemProps {
    to: string | null;
    children: any;
    rotationValue: number;
}


export default function MenuHome(props: { items: MenuItemProps[] }) {
    
    return (
        <MenuStyle
       >
            {props.items.map((item, index) => {
                return (
                    <MenuItem key={index} to={item.to} rotationValue={item.rotationValue}>
                        {item.children}
                    </MenuItem>
                )
            })}
        </MenuStyle>
    );
}
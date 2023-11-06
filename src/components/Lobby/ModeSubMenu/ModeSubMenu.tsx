import { useState } from 'react';
import MenuButton from './SelectModeMenuButton'
import styled from 'styled-components';
import { ModeType } from '../../../types/machine.type';


type ButtonProps = {
	$backgroundColor: string;
	$hoverColor?: string;
	label: string;
	modeValue: ModeType;
};

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 80%;
	position: absolute;
	top: 31%;
`;

const Button: ButtonProps[] = [
	{
		$backgroundColor: '#882178',
		$hoverColor: '#5e8b9c',
		label: 'LOCAL SPLITSCREEN MATCH',
		modeValue: ModeType.LOCALPLAYER,
	},
	{
		$backgroundColor: '#CD5050',
		$hoverColor: '#73be92',
		label: 'LOCAL VS IA MATCH',
		modeValue: ModeType.IA,
	},
];

const SelectModeSubMenu = () => {
	const [expanded, setExpanded] = useState<number>(-1);

	return (
		<>
			<MenuContainer >
				
				{Button.map((button, index) => (
					<MenuButton	
						key={index}
						setExpanded={setExpanded}
						expanded={expanded}
						$key={index}
						label={button.label}
						modeValue={button.modeValue}
						$backgroundColor={button.$backgroundColor}
						$hoverColor={button.$hoverColor}
					/>
				))}
			</MenuContainer>
		</>
	);
};

export default SelectModeSubMenu;
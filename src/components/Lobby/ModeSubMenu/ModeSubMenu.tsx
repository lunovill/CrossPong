import { useState } from 'react';
import MenuButton from './SelectModeMenuButton'
import styled from 'styled-components';
import { ModeType } from '../../../types/machine.type';


type ButtonProps = {
	$backgroundColor: string;
	label: string;
	modeValue: ModeType;
};

const ProfilTitle = styled.div`
     display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 250px);
    height: 76px;
    margin: 10px;
	padding-top: 15px;
    margin-top: 50px;

    font-family: "Yoster", serif;
	font-weight: 700;
    font-size: 32px;
    
    color: #383844;
    position: relative;
`;

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
		label: 'LOCAL SPLITSCREEN MATCH',
		modeValue: ModeType.LOCALPLAYER,
	},
	{
		$backgroundColor: '#CD5050',
		label: 'LOCAL VS IA MATCH',
		modeValue: ModeType.IA,
	},
];

// ${props => props.$expanded && css`
//   		position: absolute;	
// 		transform: translate(0%, calc((66.666% - 564px)));
// 		width: 544px;
// 		height: 566px;
//       	background-color: #FFF8DC;
//       	& > button {
//         	opacity: 0; // Hide the button text and border
//       	}
//   `}

// send({ type: 'join', id: 'j1', name: 'Tmp' });
// send({ type: 'join', id: 'j2', name: 'Bot' });
// send({ type: 'chooseMode', mode: modeValue });

const SelectModeSubMenu = () => {
	const [expanded, setExpanded] = useState<Number>(-1);

	return (
		<>
			<MenuContainer >
				
				{Button.map((button, index) => (
					<MenuButton	
						key={index}
						setExpanded={setExpanded}
						$key={index}
						label={button.label}
						modeValue={button.modeValue}
						$backgroundColor={button.$backgroundColor}
					/>
				))}
			</MenuContainer>
		</>
	);
};

export default SelectModeSubMenu;
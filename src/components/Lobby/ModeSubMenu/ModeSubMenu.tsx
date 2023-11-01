import { ModeType } from '../../../types/machine';
import MenuButton from './SelectModeMenuButton'
import styled from 'styled-components';


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
    /* font-family: "Yoster", serif; */
	font-weight: 700;
    font-size: 32px;
    /* font-weight: bold; */
    
    color: #383844;
    position: relative;
`;

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
`;

const Button: ButtonProps[] = [
	// {
	// 	$backgroundColor: '#165C5D',
	// 	label: 'ONLINE MATCHMAKING',
	// 	modeValue: ModeType.MATCHMAKING,
	// },
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

const SelectModeSubMenu = () => {
	return (
		<>
			<MenuContainer >
				<ProfilTitle>
					SELECT MODE
				</ProfilTitle>
				{Button.map((button, index) => (
					<MenuButton
						key={index}
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
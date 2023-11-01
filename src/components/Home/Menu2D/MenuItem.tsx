import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRotationValue } from '../../ContextBoard';
import { useState } from 'react';

interface MenuItemStyleProps {
	$isHovered?: boolean;
}

const MenuItemStyle = styled.div<MenuItemStyleProps>`
  transition: all 0.3s ease;
  padding: 5px;
  transform: translateY(0);
  color:  #000000;
  font-family: 'inknutAntiqua', sans-serif;
 cursor: pointer;
  
  @media (max-width: 900px) {
	  text-align: center;
  }
  ${props => props.$isHovered && `
    color:  #b36b89;
    transform:  scale(1.1) translateX(30px);
	@media (max-width: 900px) {
		transform:  scale(1.1);
  
	}
  `}
`;

const Hoover = styled.div<MenuItemStyleProps>`
 
 width: 100%;
 height: 100%;
  ${props => props.$isHovered && `
    background-color: #f7f5fc;
    color:  #b36b89;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    transform:  scale(1.1);
	media (max-width: 900px) {

  `}
`;


interface MenuItemProps {
	to: string | null;
	children: any;
	rotationValue: number;
}

export function MenuItem(props: MenuItemProps) {

	const [isHovered, setIsHovered] = useState(false);
	const { setRotation, rotation, setNeedToRotate } = useRotationValue();

	const handleMouseEnter = () => {
		setRotation(props.rotationValue);
		setIsHovered(true);
		setNeedToRotate(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<>
			{props.to ?
				<Link
					style={{ textDecoration: 'none' }}
					to={props.to}>
					<Hoover
						$isHovered={isHovered || rotation === props.rotationValue}>
						<MenuItemStyle
							$isHovered={isHovered || rotation === props.rotationValue}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}>
							{props.children}
						</MenuItemStyle>
					</Hoover>
				</Link>
				:
				<Hoover
					$isHovered={isHovered || rotation === props.rotationValue}>
					<MenuItemStyle
						$isHovered={isHovered || rotation === props.rotationValue}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}>
						{props.children}
					</MenuItemStyle>
				</Hoover>
			}
		</>

	)
}

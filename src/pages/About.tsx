import { memberInfosTab } from '../data/models/TeamMember';
import TeamMemberCard from '../components/About/TeamMemberCard';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TitleAbout from '../components/About/TitleAbout';

const GridContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  background-color: #e65437;
  grid-template-columns: minmax(0, 1fr) repeat(3, minmax(200px, 350px)) minmax(0, 1fr);
  grid-template-rows: repeat(15, 1fr);
`;

type GridItemProps = {
	$color?: string;
	$colStart: number;
	$colEnd: number;
	$rowStart: number;
	$rowEnd: number;
}

const GridItem = styled.div<GridItemProps>`
z-index: 1;
  background-color: ${(props) => props.$color};
  text-align: center;
  grid-column: ${(props) => props.$colStart} / ${(props) => props.$colEnd};
  grid-row: ${(props) => props.$rowStart} / ${(props) => props.$rowEnd};
  `;

const ContainerTitle = styled.div`
	position: absolute;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	left: 36%;
  	top: 5%;
  	transform: translateX(-50%) ;

`;

const LineBackground = styled.div`
	position: absolute;
	background-color: #f3d18b;
	height: 80px;
	width: 28vw;
	left: 0%;
  	bottom: 48%;
	transform: translate(0%, 50%);
	overflow: hidden;
`;

const LineBackground2 = styled.div`
	position: absolute;
	background-color: #f3d18b;
	height: 80px;
	width: 28vw;
	right: 0%;
	/* left: -1000px; */
  	top: 30%;
	transform: translate(0%, 50%);
	overflow: hidden;
`;


const GridItems: GridItemProps[] = [
	{
		$colStart: 2,
		$colEnd: 3,
		$rowStart: 6,
		$rowEnd: 12
	},
	{
		$colStart: 3,
		$colEnd: 4,
		$rowStart: 5,
		$rowEnd: 11
	},
	{
		$colStart: 4,
		$colEnd: 5,
		$rowStart: 4,
		$rowEnd: 10
	}
];


const Title = styled.img`
	width: 220px;
	left: 50%;
	font-size: 3rem;
	user-select: none;
	color: #b36b89;
	transform: rotate(-5deg) translate(5%, 0%);


@media (min-width: 1920px) {
  width: 220px;
}
@media (max-width: 768px) {
	  width: 100px;
}
`

export default function MyGrid() {
	return (
		<>
			<LineBackground />
			<LineBackground2 />
			<GridContainer>
				<ContainerTitle>
					<Link to="/">
						<Title src="/images/CrossPongLogo.webp" alt="Cross Pong Logo" />
					</Link>
					<TitleAbout />
				</ContainerTitle>
				{GridItems.map((item, index) => (
					<GridItem key={index} {...item}>
						<TeamMemberCard key={index} $key={index} member={memberInfosTab[index]} />
					</GridItem>
				))}
			</GridContainer>
		</>
	);
}
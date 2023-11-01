import transition from '../components/Transition';
import styled from 'styled-components';
import HomeScene from '../components/Home/Menu3D/HomeScene';
import MenuHome from '../components/Home/Menu2D/MenuHome';
import {  MeshProvider, RotationProvider } from '../components/ContextBoard';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr minmax(0, 500px) minmax(0, 1000px) 1fr;
	grid-template-rows: 1fr 2fr;
	overflow-x: hidden;
	overflow-y: hidden;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	z-index: 0;
	@media (max-width: 1800px) {
		grid-template-columns: 1fr minmax(0, 400px) minmax(0, 800px) 1fr;
	}
`
const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
	grid-column: 2 / 3;
	grid-row: 1 / 2;
	width: 100%;
	height: 100%;
	z-index: 2;
	margin: 0;
	padding: 0;
`

const Title = styled.img`
	transform: translate(0%, -20%);
	width: 45%;
	font-size: 3rem;
	user-select: none;
	color: #b36b89;
`

const MenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
	grid-column: 2 / 3;
	grid-row: 2 / 3;
	width: 100%;
	height: 100%;
	z-index: 2;
	transform: rotate(-5deg) translate(-35%, 0%);
	margin-left: 30%;
	padding: 0;
	
    @media (max-width: 1800px) {
		font-size: 3rem;
		transform: rotate(-5deg) translate(-15%, 0%);
    }
	
	@media (max-width: 900px) {
		align-items: center;
		margin-left: 20%;
		transform: rotate(0) translate(40%, 40%);
	}
	`

const items = [
	{ to: '/game', children: 'Let\'s Play', rotationValue: 1.245 },
	{ to: '/profile', children: 'Profile', rotationValue: 5.95 },
	{ to: null, children: 'Chatbox', rotationValue: 4.39 },
	{ to: 'https://github.com/pandamanxv3/Transcendance', children: 'About Us', rotationValue: 2.837 },
]


const Home = () => {


	return (
		<MeshProvider>
			<RotationProvider>
				<Container
					draggable={false}
					onDragStart={(e) => e.preventDefault()}>
					<TitleContainer>
						<Title src="/images/CrossPongLogo.png" alt="Cross Pong Logo" />
					</TitleContainer>
					<MenuContainer>
						<MenuHome items={items} />
					</MenuContainer>
					<HomeScene />
				</Container>
			</RotationProvider>
		</MeshProvider>
	)
}

export default transition(Home);

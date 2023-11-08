import styled from 'styled-components';
import AnimationHomeLoading from '../../components/HomeLoading/Animation-HomeLoading';

const Container = styled.div`
display: grid;
background-color: #5f8d9f;
grid-template-columns: 1fr 300px 1fr;
grid-template-rows: 200px 300px 1fr;
overflow-x: hidden;
overflow-y: hidden;
width: 100%;
height: 100%;
margin: 0;
padding: 0;
z-index: 0;
`;

const AnimationDiv = styled.div`
display: flex;
grid-column: 2 / 3;
grid-row: 2 / 3;
width: 100%;
height: 100%;
margin: 0;
padding: 0;
`;


const HomeLoading = () => {
	return (
		<Container>
			<AnimationDiv >
				<AnimationHomeLoading />
			</AnimationDiv >
		</Container>
	);
}


export default HomeLoading;
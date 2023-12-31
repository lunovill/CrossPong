import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UpdateInfo from '../components/Profil/ChangeInfo';
import { WrittingContainer } from '../components/Profil/ProfileStyle';
import { Link } from 'react-router-dom';
import { initializeSessionStorage } from '../components/Profil/CheckInfoSessionStorage';
import { Score, getScoresFromSessionStorage } from '../components/MatchHistory';


const ContainerBlock = styled.div`
	width: 310px;
	height: 620px;
	background-color: #955DDE;
	position: absolute;
	z-index:-10;
	clip-path: polygon(0% 0%, 80% 0%, 100% 10%, 100% 100%,  20% 100%, 0% 90%);
`;

const OutlineBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 295px;
	height: 590px;
	outline: 1px solid #000000;
	border-radius: 5px;
	position: relative;
`;

const ProfilTitle = styled.div`
  font-family: 'InknutAntiqua', sans-serif;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 400;
  color: #ffffff;
  font-size: 30px;
  position: relative;

  &::before,
  &::after,
  & > span::before,
  & > span::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  &::before {
	transform: translate(0%, 100%);
    top: 0;
    left: 0;
  }

  &::after {
	transform: translate(0%, 100%);
    top: 0;
    right: 0;
  }

  & > span::before {
	transform: translate(0%, -100%);
    bottom: 0;
    left: 0;
  }

  & > span::after {
	transform: translate(0%, -100%);
    bottom: 0;
    right: 0;
  }
`;

const ScoreContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
`;

const LineScoreContainer = styled.div`
	width: 95%;
	height: auto;
	transform: translate(0%, -70%);
	display: flex;
	flex-direction: row;
	position: relative;
	justify-content: center;
	align-items: center;
`;


const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
	position: absolute;

	width: 10%;
	height: 10%;
	top: 5%;
	left: 5%;
	z-index: 2;
	margin: 0;
	padding: 0;
	@media (max-height: 800px) {
		top: 22%;
	}
`

const Title = styled.img`
	transform: translate(0%, 0%);
	width: 100%;
	font-size: 3rem;
	user-select: none;
	color: #b36b89;

@media (min-width: 1920px) {
  width: 120px;
}
`


interface WrittingContainerProps {
	$isUser?: boolean;
	$left?: string;
	$width?: string;
	$textAlign?: string;
	$color?: string;
};

export const WrittingContainer2 = styled.div<WrittingContainerProps>`
	width: ${props => props.$width || '1300px'};
	left: ${props => props.$left || '0px'};
	font-family: 'InknutAntiqua', sans-serif;
	font-weight: 700;
	line-height: 1.5;
	color: ${props => props.$isUser ? '#d3b769' : '#000000'};
	
	font-size: 11px;
	margin-top: 0px;
  	text-align: ${props => props.$textAlign || 'center'};
`;

const StyledImage = styled.img`
	width: 150px;
	height: 150px;
	border-radius: 5%;
	object-fit: cover;
	margin-top: 20px;
	margin-bottom: 5px;
`;

const PageContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	grid-template-rows: 1fr auto 1fr;
	height: 100vh;
	width: 100vw;
`;

const Container = styled.div`
  padding-top: 50px;
	  grid-column: 2;
	    grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Profil() {

	const [pseudo, setPseudo] = useState<string>("");
	const [profilePicture, setProfilePicture] = useState<string>("");
	const [matches, setMatches] = useState<Score[]>([]);

	useEffect(() => {
		const pseudo = sessionStorage.getItem("pseudo");
		const profilePicture = sessionStorage.getItem("profilePicture");
		const matches = sessionStorage.getItem('scores');

		if (pseudo && profilePicture) {
			setPseudo(pseudo);
			setProfilePicture(profilePicture);
		}
		else {
			initializeSessionStorage();
			setPseudo(sessionStorage.getItem("pseudo") || "Tommy");
			setProfilePicture(sessionStorage.getItem("profilePic") || "/images/profilPicture/ninja4.png");
		}
		if (matches) {
			setMatches(getScoresFromSessionStorage());
		}
	}, []);


	return (
		<>
			<TitleContainer>
				<Link to="/">
					<Title src="/images/CrossPongLogo.webp" alt="Cross Pong Logo" />
				</Link>
			</TitleContainer>
			<PageContainer>

			<Container>
				<OutlineBlock>
					<ProfilTitle>
						PROFILE
						<span></span>
					</ProfilTitle>

					<>
						<StyledImage src={profilePicture} alt="Profile picture" />
						<WrittingContainer $margin='2px'>{pseudo} </WrittingContainer>
						{matches &&
							<>
								<WrittingContainer $color='#000000' $weight='700' $size='15px' $margin='38px'>Last 10 matches</WrittingContainer>

								<ScoreContainer>
									{matches.length !== 0 ?
										matches.map((match, index) => {
											return (
												<LineScoreContainer key={"LineScoreContainer" + index}>
													<WrittingContainer2 key={index} $textAlign={"left"} $isUser={true}>{pseudo}</WrittingContainer2>
													<WrittingContainer2 $width={'350px'} $textAlign={"left"} key={index + 42}>{match.scorePlayer1} - {match.scorePlayer2}</WrittingContainer2>
													<WrittingContainer2 key={index + 84} $textAlign={"right"} $isUser={false}>{match.player2}</WrittingContainer2>
												</LineScoreContainer>
											);
										}) :
										<LineScoreContainer>
											<WrittingContainer2 $textAlign={"center"} $isUser={true}>No match yet</WrittingContainer2>
										</LineScoreContainer>
									}
								</ScoreContainer>
							</>
						}
						<WrittingContainer $color='#000000' $weight='700' $size='15px'>
						</WrittingContainer>
						<UpdateInfo name={pseudo} setProfilePic={setProfilePicture} setPseudo={setPseudo} />
					</>

				</OutlineBlock>
				<ContainerBlock />
			</Container>
			</PageContainer>
		</>
	);
}

import { memberInfo } from "../../data/models/TeamMember";
import { Fragment } from "react";
import styled from "styled-components"

type ContainerProps = {
    $key: number;
}

const Icon = styled.img`
	width: 24px;
	height: 24px;
	border-radius: 10px;
	margin: 0.2rem;
	margin-top: -10px;
`

const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    outline: ${props => props.$key % 2 === 1 ? "2px dashed #f3d08bd5" : "2px solid #000000"};    
	border-radius: 5px;
    margin: 1rem;
`
const Avatar = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 1rem; // Espace entre l'image et le titre
`
const Title = styled.div`
    font-family: 'inknutAntiqua';
    text-align: left;
    letter-spacing: 0.03rem;
	font-weight: bold;
    font-size: 1.4rem;
	line-height: 1.4rem;
    margin-bottom: 1rem;
`
const Role = styled.div`
    font-family: 'HalyardDisplay';
    text-align: justify;
    font-weight: normal;
    font-size: 0.8rem;
`
const SpecialCharacter = styled.span`
    color: white;
`
type Props = {
    $key: number;
    member: memberInfo;
}

const TeamMemberCard = (props: Props) => {
    const { name, role } = props.member;
    const renderStyledText = (text: string, char: string) => {
        return text.split(char).map((segment, index, array) =>
            index === array.length - 1 ? segment : <Fragment key={index}>
                {segment}<SpecialCharacter key={index}>{char}</SpecialCharacter>
            </Fragment>
        );
    };

    const handleClickLinkedin = (): void => {
        window.open(props.member.linkedin, '_blank');
    };

    const handleClickGithub = (): void => {
        window.open(props.member.github, '_blank');
    };

    const handleClickArtStation = (): void => {
        window.open(props.member.artStation, '_blank');
    };

    return <>
            <Container $key={props.$key}>
                <Avatar src={props.member.avatar} />
                <Title>
                    {renderStyledText(name, "—")}
                </Title>
                <Role>
                    {renderStyledText(role, "/")}
                </Role>
            </Container>
            <Icon src={"UI/linkedinIcon.png"} onClick={handleClickLinkedin} />
            {props.member.github
                && <Icon src={"UI/githubIcon.png"} onClick={handleClickGithub} />
            }
            {props.member.artStation
                && <Icon src={"UI/artstationIcon.png"} onClick={handleClickArtStation} />}
        </>;
}

export default TeamMemberCard;

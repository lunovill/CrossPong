import React from "react";
import { memberInfo } from "../../data/models/TeamMember"
import styled from "styled-components"

type ContainerProps = {
    $key: number;
}
const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    outline: ${props => props.$key % 2 === 1 ? "2px dashed black" : "2px solid black"};
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
    font-family: 'HalyardBold';
    text-align: left;
    letter-spacing: 0.03rem;
    font-size: 1.5rem;
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
            index === array.length - 1 ? segment : <React.Fragment key={index}>
                {segment}<SpecialCharacter key={index}>{char}</SpecialCharacter>
            </React.Fragment>
        );
    };

    return (
        <>
            <Container $key={props.$key}>
                <Avatar src={props.member.avatar} />
                <Title>
                    {renderStyledText(name, "—")}
                </Title>
                <Role>
                    {renderStyledText(role, "/")}
                </Role>
            </Container>
        </>
    )
}

export default TeamMemberCard;

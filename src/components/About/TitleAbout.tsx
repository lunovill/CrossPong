import styled from 'styled-components';

interface TitleAboutProps {
	$color?: string;
	$transform?: string;
}

const Title1 = styled.div<TitleAboutProps>`	

    font-family: 'inknutAntiqua';
    text-align: left;
    letter-spacing: 0.03rem;
	font-weight: bold;
	color: ${(props) => props.$color ? props.$color: "black"};
    font-size: 2.8rem;
	transform: ${(props) => props.$transform ? props.$transform: "none"};
	line-height: 3.5rem;
	@media (max-width: 768px) {
		font-size: 1.5rem;
		line-height: 2.5rem;
	}
`;

const Title2 = styled.div<TitleAboutProps>`	
	position: absolute;
    font-family: 'inknutAntiqua';
    text-align: left;
    letter-spacing: 0.03rem;
	font-weight: bold;
	z-index: -10;
	color: ${(props) => props.$color ? props.$color: "black"};
    font-size: 2.8rem;
	transform: ${(props) => props.$transform ? props.$transform: "none"};
	line-height: 3.5rem;
	@media (max-width: 768px) {
		font-size: 1.5rem;
		line-height: 2.5rem;
	}
`;


const TitleAbout = () => {
    return (
        <>
            <Title1 $color='##000000b5'>
                'S TEAM
            </Title1>
			<Title2 $color='#f3d08bd5' $transform='translate(84%, 80%)'>
                TEAM
            </Title2>
			<Title2 $color='#f3d08bd5' $transform='translate(84%, -80%)'>
                TEAM
            </Title2>
			<Title2 $color='#f3d08ba4' $transform='translate(84%, -160%)'>
                TEAM
            </Title2>
			<Title2 $color='#f3d08b5e' $transform='translate(84%, -240%)'>
                TEAM
            </Title2>
       
        </>
    );
};

export default TitleAbout;
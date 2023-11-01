import styled from 'styled-components';

const Title1 = styled.div`

    font-family: 'HalyardBold';
    text-align: left;
    letter-spacing: 0.03rem;
    font-size: 5.5rem;
    margin-bottom: 1rem;
    padding-left: 1rem;
    z-index: 1;
`;

type OutlinedTextProps = {
    $pos: number;
}
const OutlinedText = styled.span<OutlinedTextProps>`
    transform: ${(props) => `translate(0px, ${props.$pos}px)`};
    font-family: 'HalyardBold';
    font-size: 5.5rem;
    -webkit-text-stroke: 2px white;
    padding-left: 1rem;
    color: transparent;
    z-index: 0;
    opacity: 1;
`;

const diffTransform: number[] = [
    10,
    40,
    40,
    10,
    10,
]

const TitleAbout = () => {
    return (
        <>
            <Title1>
                ABOUT US
            </Title1>
            <Title1>
                TWO-FACTOR
            </Title1>
            {diffTransform.map((value, index) => {
                return (
                    <OutlinedText key={index} $pos={value}>
                        ABOUT US
                    </OutlinedText>
                )
            }
            )}
        </>
    );
};

export default TitleAbout;
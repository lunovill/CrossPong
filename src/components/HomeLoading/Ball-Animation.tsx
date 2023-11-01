import styled from 'styled-components'

const Ball = styled.div`
    visibility: hidden;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: black;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 40%;
    transform: scale(0);
    animation: ball 4s infinite;    
    animation-timing-function: linear;
    animation-delay: 1.8s;
    @keyframes ball {
        0% {
            visibility: visible;
            transform: scale(0.35);
            top: 52%;
            left: 25%;
            background-color: #e28e48;
        }
        25% {
            transform: scale(0.15);
            top: 15%;
            left: 47%;
            background-color: #d45f3b;
        }
        50% {
            transform: scale(0.35);
            top: 52%;
            left: 61%;
            background-color: #e28e48;
        }
        75% {
            transform: scale(0.15);
            top: 15%;
            left: 40%;
            background-color: #d45f3b;
        }
        100% {
            transform: scale(0.35);
            top: 52%;
            left: 25%;
            background-color: #e28e48;

        }
    }
`

const BallLoadingAnimation = () => {
    return <Ball />
}

export default BallLoadingAnimation
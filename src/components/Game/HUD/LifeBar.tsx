import { useEffect, useState } from 'react';
import styled from 'styled-components'

type LifeBarContainerProps = {
	$mirrored?: boolean;
};

const LifeBarContainer = styled.div<LifeBarContainerProps>`
	position: absolute;
	top: 0;
	left: ${(props) => (props.$mirrored ? 'auto' : '0')};
	right: ${(props) => (props.$mirrored ? '0' : 'auto')};
	width: 165px;
	height: 30px;
	transform: ${(props) => (props.$mirrored ? 'scaleX(-1)' : 'none')};
  
	@media (max-width: 768px) {
	  width: 110px;
	  height: 20px;
	}
  `;

const BarLife = styled.img`
  width: 165px;
  height: 30px;
  object-fit: cover;

  @media (max-width: 768px) {
	width: 110px;
	height: 20px;
  }
`;

interface ColorProps {
	$lifeRemaining: number;
}

interface SliceLifeProps {
	$position: number;
}

interface BlinkingSliceProps {
	$isBlinking: boolean;
}

const filter: string[] = [
	'',
	'hue-rotate(-15deg) saturate(3) hue-rotate(-25deg)',
	'hue-rotate(0deg)',
	'hue-rotate(30deg)',
	'hue-rotate(85deg)',
	'hue-rotate(120deg)',
];

const FirstSliceLife = styled.img<ColorProps>`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 30px;
  height: 14.25px;
  filter: ${(props: ColorProps) => filter[props.$lifeRemaining]};
  object-fit: cover;

  @media (max-width: 768px) {
	width: 20px;
	height: 10px;
	top: 5px;
	left: 5.5px;
  }
`;

const SliceLife = styled.img<SliceLifeProps & BlinkingSliceProps & ColorProps>`
  position: absolute;
  top: 8px;
  left: ${(props: SliceLifeProps) => props.$position}px;
  width: 33.7px;
  height: 14px;
  object-fit: cover; // 75
  filter: ${(props: ColorProps) => filter[props.$lifeRemaining]};
  @media (max-width: 768px) {
	width: 22.5px;
	height: 10px;
	top: 5px;
	left: ${(props: SliceLifeProps) => props.$position / 1.51}px;
  }

  animation: ${(props: BlinkingSliceProps) =>
		props.$isBlinking ? 'blinking 2s infinite' : 'none'};
  
  @keyframes blinking {
    0% {
      opacity: 1;
    }
	10% {
		opacity: 0;
	}
	25% {
	  opacity: 1;
	}
	45% {
		opacity: 0;
	}
	70% {
		opacity: 1;
	}
    100% {
      opacity: 0;
    }
  }
`;

const separatorPositions = [34, 64, 94, 124];

type Props = {
	mirrored?: boolean;
	lifeRemaining?: number;
};

const LifeBar = ({ mirrored = false, lifeRemaining = 5 }: Props) => {
	const [currentSlice, setCurrentSlice] = useState(0);
	const [blinkingSlice, setBlinkingSlice] = useState<number | null>(null);
	const [firstAnimationFinished, setFirstAnimationFinished] = useState(false);

	useEffect(() => {
		if (currentSlice === 4) {
			setFirstAnimationFinished(true);
		}
	}, [currentSlice]);

	useEffect(() => {
		if (firstAnimationFinished === false) {
			const timer = setInterval(() => {
				setCurrentSlice(prevSlice => prevSlice + 1);
			}, 400);

			return () => clearInterval(timer);
		}
	}, [currentSlice]);

	useEffect(() => {
		if (lifeRemaining !== 5 && lifeRemaining < currentSlice) {
			setBlinkingSlice(lifeRemaining + 1);
			const timer = setTimeout(() => {
				setBlinkingSlice(null);
				setCurrentSlice(lifeRemaining);
			}, 2000); // Durée de l'animation !

			return () => clearTimeout(timer);
		}
	}, [lifeRemaining]);

	return (
		<LifeBarContainer $mirrored={mirrored}>
			<BarLife src="/images/hudGame/barLife/BarLife.png" />
			{currentSlice >= 1 && <FirstSliceLife src="/images/hudGame/barLife/BarLifeFirstSlice.png" $lifeRemaining={currentSlice} />}
			{separatorPositions.map((position, index) => (
				currentSlice >= index + 2 && (<SliceLife key={index} $position={position} $lifeRemaining={currentSlice} src="/images/hudGame/barLife/BarLifeSlice.png" $isBlinking={index + 2 === blinkingSlice} />
				)))}
		</LifeBarContainer>
	)
}

export default LifeBar;

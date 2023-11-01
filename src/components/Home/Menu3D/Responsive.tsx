import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const Responsive = () => {

	const { camera } = useThree();
	const updateCameraPosition = () => {

		const width = window.innerWidth;

		if (width < 900) {
			camera.position.set(0.2, 3.5, 15);
			camera.far = 16;
			camera.lookAt(0, 0, 0);
		}
		else if (width < 1200) {
			camera.position.set(-0.1, 3.5, 10);
			camera.far = 11;
			camera.lookAt(-1.5, 0, 0);
		}
		else {
			camera.position.set(0, 3, 9);
			camera.lookAt(-1.5, 0, 0);
			camera.far = 10.1;
		}
	};

	useEffect(() => {
		updateCameraPosition();

		const handleResize = () => {
			updateCameraPosition();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<></>
	)
}

export default Responsive
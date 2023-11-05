import { Vec2 } from 'p2-es';
import { BALL_RADIUS, MAP_HEIGHT, OFFSET, OFFSETBOOT, PADDLE_HEIGHT, PADDLE_POSITION, PADDLE_WIDTH } from '../game.constants';
import Paddle from './Paddle';

type Predict = {
	type: 'none' | 'paddle' | 'border' | 'stone' | 'limit',
	position: Vec2,
	velocity: Vec2
}

function predictBallTrajectory(
	ballPosition: Vec2,
	ballVelocity: Vec2,
	playerPosition: Vec2,
	botPosition: Vec2,
	stonePositions: Vec2[]
): Predict {
	const predictedPosition: Vec2 = [...ballPosition];
	const predictVelocity: Vec2 = [...ballVelocity];

	const formatFloatToFixed2 = (tuple: Vec2): Vec2 => {
		return [parseFloat(tuple[0].toFixed(2)), parseFloat(tuple[1].toFixed(2))]
	}

	while (true) {
		predictedPosition[0] += ballVelocity[0] * OFFSETBOOT;
		predictedPosition[1] += ballVelocity[1] * OFFSETBOOT;

		if (ballVelocity[0] === 0 && ballVelocity[1] === 0) {
			return { type: 'none', position: [0, 0], velocity: [0, 0] };
		}

		for (const stone of stonePositions) {
			const dx = predictedPosition[0] - stone[0];
			const dy = predictedPosition[1] - stone[1];

			if (Math.abs(dx) <= BALL_RADIUS
				&& Math.abs(dy) <= BALL_RADIUS) {
				if (PADDLE_POSITION > Math.abs(stone[0]) && Math.abs(dy) > Math.abs(dx)) {
					predictVelocity[1] *= -1;
				} else {
					predictVelocity[0] *= -1;
				}
				return { type: 'stone', position: formatFloatToFixed2(predictedPosition), velocity: formatFloatToFixed2(predictVelocity) };
			}
		}

		if (predictedPosition[1] <= -MAP_HEIGHT / 2 + OFFSET + BALL_RADIUS
			|| predictedPosition[1] >= MAP_HEIGHT / 2 - OFFSET - BALL_RADIUS) {
			predictVelocity[1] *= -1;
			return { type: 'border', position: formatFloatToFixed2(predictedPosition), velocity: formatFloatToFixed2(predictVelocity) };
		}

		// if (predictedPosition[1] >= playerPosition[1] - BALL_RADIUS - OFFSETBOOT
		// 	&& predictedPosition[1] <= playerPosition[1] + BALL_RADIUS + OFFSETBOOT) {
		// 	const collisionPoint: number = predictedPosition[1] - playerPosition[1];
		// 	predictVelocity[0] *= -1;
		// 	predictVelocity[1] = ((predictedPosition[1] > 2.16 || predictedPosition[1] < -2.16) ? -collisionPoint : collisionPoint) * 5;
		// 	return { type: 'paddle', position: formatFloatToFixed2(predictedPosition), velocity: formatFloatToFixed2(predictVelocity) };
		// }

		// if (predictedPosition[1] >= botPosition[1] - BALL_RADIUS - OFFSETBOOT
		// 	&& predictedPosition[1] <= botPosition[1] + BALL_RADIUS + OFFSETBOOT) {
		// 	const collisionPoint: number = predictedPosition[1] - playerPosition[1];
		// 	predictVelocity[0] *= -1;
		// 	predictVelocity[1] = ((predictedPosition[1] > 2.16 || predictedPosition[1] < -2.16) ? -collisionPoint : collisionPoint) * 5;
		// 	return { type: 'paddle', position: formatFloatToFixed2(predictedPosition), velocity: formatFloatToFixed2(predictVelocity) };
		// }

		if (predictedPosition[0] <= -PADDLE_POSITION
			|| predictedPosition[0] >= PADDLE_POSITION) {
			return { type: 'limit', position: formatFloatToFixed2(predictedPosition), velocity: formatFloatToFixed2(predictVelocity) };
		}
	}
}

export function bot(
	ballPosition: Vec2,
	ballVelocity: Vec2,
	playerPosition: Vec2,
	botPosition: Vec2,
	stonePositions: Vec2[]): Paddle['key'] & { power: boolean, ulti: boolean } {
	const key: Paddle['key'] & { power: boolean, ulti: boolean } = {
		leftward: false,
		rightward: false,
		power: false,
		ulti: false
	}

	const predict: Predict = predictBallTrajectory(ballPosition, ballVelocity, playerPosition, botPosition, stonePositions);
	if (predict.type === 'none') return key;
	console.log(predict.type);

	let targetY: number = predict.position[1];
	if (ballVelocity[0] < 0) { // Player
		targetY = botPosition[1];
		// if (predict.type === 'paddle') {
		// 	targetY = playerPosition[1];
		// } else if (predict.type === 'border') {
		// 	targetY = 0;
		// } else if (predict.type === 'stone') {
		// 	targetY = predict.position[1];
		// } else if (predict.type === 'limit') {
		// 	targetY = 0;
		// }
	} else { // Bot
		if (predict.type === 'paddle') return key;
		if (predict.type === 'border') {
			if (predict.position[0] < 0) {
				targetY = 0;
			} else {
				const newPredict: Predict = predictBallTrajectory(predict.position, predict.velocity, playerPosition, botPosition, stonePositions);
				if (newPredict.type === 'limit') { targetY = newPredict.position[1]; }
			}
		} else if (predict.type === 'stone') {
			if (predict.velocity[0] > 0) {
				const newPredict: Predict = predictBallTrajectory(predict.position, predict.velocity, playerPosition, botPosition, stonePositions);
				if (newPredict.type === 'limit') { targetY = newPredict.position[1]; }
			} else {
				targetY = 0;
			}
		} else if (predict.type === 'limit') {
			targetY = predict.position[1];
		}
	}

	if (targetY < botPosition[1] - OFFSETBOOT) {
		key.leftward = true;
		key.rightward = false;
	} else if (targetY > botPosition[1] + OFFSETBOOT) {
		key.leftward = false;
		key.rightward = true;
	}
	return key;
}
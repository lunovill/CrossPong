import { Vec2 } from 'p2-es';
import { MAP_HEIGHT, OFFSETBOOT } from './config';
import Paddle from './Paddle';
import Ball from './Ball';

export function bot(ball: Ball, playerNeg: Paddle, playerPos: Paddle): Paddle['key'] {
	const ballDirection: Vec2 = ball.body.velocity;
	const ballPosition: Vec2 = ball.body.position;
	const playerPosition: Vec2 = playerNeg.body.position;
	const botPosition: Vec2 = playerPos.body.position;
	let { leftward, rightward }: { leftward: boolean, rightward: boolean } = { leftward: false, rightward: false }

	if (ballDirection[0] < 0 && ballPosition[0] < 0) {
		if (botPosition[1] < playerPosition[1] - 1) {
			leftward = false;
			rightward = true;
		} else if (botPosition[1] > playerPosition[1] + 1) {
			leftward = true;
			rightward = false;
		}
	} else if (ballDirection[0] > 0 && ballPosition[0] < 0) {
		const gardian: number = MAP_HEIGHT / 4;
		if (botPosition[1] < -gardian) {
			leftward = false;
			rightward = true;
		} else if (botPosition[1] > gardian) {
			leftward = true;
			rightward = false;
		}
	} else if (ballDirection[0] > 0 && ballPosition[0] > 0) {
		const offset: number = OFFSETBOOT;
		if (botPosition[1] < ballPosition[1] - offset) {
			leftward = false;
			rightward = true;
		} else if (botPosition[1] > ballPosition[1] + offset) {
			leftward = true;
			rightward = false;
		}
	} else if (ballDirection[0] < 0 && ballPosition[0] > 0) {
		const gardian: number = MAP_HEIGHT / 4;
		if (botPosition[1] < -gardian) {
			leftward = false;
			rightward = true;
		} else if (botPosition[1] > gardian) {
			leftward = true;
			rightward = false;
		}
	}
	return { leftward, rightward };
}
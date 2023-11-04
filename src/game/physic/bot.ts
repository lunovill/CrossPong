import { Vec2 } from 'p2-es';
import { BALL_RADIUS, MAP_HEIGHT, MAP_WIDTH, OFFSETBOOT, PADDLE_POSITION } from '../game.constants';
import Paddle from './Paddle';
import Ball from './Ball';

function predictBallTrajectory(
	ballPosition: Vec2,
	ballVelocity: Vec2,
	playerPosition: Vec2,
	botPosition: Vec2,
	stonePositions: Vec2[]
): Vec2 {
	// Calcul de la trajectoire future de la balle
	const predictedPosition: Vec2 = [...ballPosition];
	const predictedVelocity: Vec2 = [...ballVelocity];

	while (true) {
		// Met à jour la position prévue en fonction de la vitesse
		predictedPosition[0] += predictedVelocity[0];
		predictedPosition[1] += predictedVelocity[1];

		if (predictedPosition[0] === 0 && predictedPosition[1] === 0) {
			return [0, 0];
		}

		// Vérifie les collisions avec les paddles
		if (predictedPosition[0] >= playerPosition[0] - BALL_RADIUS
			&& predictedPosition[0] <= playerPosition[0] + BALL_RADIUS
			&& predictedPosition[1] >= playerPosition[1] - BALL_RADIUS
			&& predictedPosition[1] <= playerPosition[1] + BALL_RADIUS) {
			// Collision avec le joueur
			return predictedPosition;
		}

		if (predictedPosition[0] >= botPosition[0] - BALL_RADIUS
			&& predictedPosition[0] <= botPosition[0] + BALL_RADIUS
			&& predictedPosition[1] >= botPosition[1] - BALL_RADIUS
			&& predictedPosition[1] <= botPosition[1] + BALL_RADIUS) {
			// Collision avec le bot
			return predictedPosition;
		}

		// Vérifie les collisions avec les bords du terrain
		if (Math.abs(predictedPosition[1]) <= -MAP_HEIGHT
			|| Math.abs(predictedPosition[1]) >= MAP_HEIGHT) {
			// Collision avec un bord
			return predictedPosition;
		}

		// Vérifie les collisions avec d'autres objets (pierres)
		for (const stone of stonePositions) {
			const dx = predictedPosition[0] - stone[0];
			const dy = predictedPosition[1] - stone[1];

			if (
				Math.abs(dx) <= BALL_RADIUS
				&& Math.abs(dy) <= BALL_RADIUS
			) {
				// Collision avec une pierre
				return predictedPosition;
			}
		}

		if (predictedPosition[0] <= -PADDLE_POSITION
			|| predictedPosition[0] >= PADDLE_POSITION) {
			// Score
			return predictedPosition;
		}
	}
}

export function bot(
	ballPosition: Vec2,
	ballVelocity: Vec2,
	playerPosition: Vec2,
	botPosition: Vec2,
	stonePositions: Vec2[]): Paddle['key'] {
	let leftward = false;
	let rightward = false;
	let power = false;
	let ulti = false;

	const predictBallPosition: Vec2 = predictBallTrajectory(ballPosition, ballVelocity, playerPosition, botPosition, stonePositions);
	if (predictBallPosition[1] < botPosition[1] - OFFSETBOOT) {
		leftward = true;
		rightward = false;
	} else if (predictBallPosition[1] > botPosition[1] + OFFSETBOOT) {
		leftward = false;
		rightward = true;
	}
	// if (ballVelocity[0] < 0 && ballPosition[0] < 0) {
	// 	if (botPosition[1] < playerPosition[1] - 1) {
	// 		leftward = false;
	// 		rightward = true;
	// 	} else if (botPosition[1] > playerPosition[1] + 1) {
	// 		leftward = true;
	// 		rightward = false;
	// 	}
	// } else if (ballVelocity[0] > 0 && ballPosition[0] < 0) {
	// 	const gardian: number = MAP_HEIGHT / 4;
	// 	if (botPosition[1] < -gardian) {
	// 		leftward = false;
	// 		rightward = true;
	// 	} else if (botPosition[1] > gardian) {
	// 		leftward = true;
	// 		rightward = false;
	// 	}
	// } else if (ballVelocity[0] > 0 && ballPosition[0] > 0) {
	// 	const offset: number = OFFSETBOOT;
	// 	if (botPosition[1] < ballPosition[1] - offset) {
	// 		leftward = false;
	// 		rightward = true;
	// 	} else if (botPosition[1] > ballPosition[1] + offset) {
	// 		leftward = true;
	// 		rightward = false;
	// 	}
	// } else if (ballVelocity[0] < 0 && ballPosition[0] > 0) {
	// 	const gardian: number = MAP_HEIGHT / 4;
	// 	if (botPosition[1] < -gardian) {
	// 		leftward = false;
	// 		rightward = true;
	// 	} else if (botPosition[1] > gardian) {
	// 		leftward = true;
	// 		rightward = false;
	// 	}
	// }
	return { leftward, rightward };
}
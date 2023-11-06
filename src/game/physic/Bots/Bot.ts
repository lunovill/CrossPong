import { Vec2 } from 'p2-es';
import { BALL_RADIUS, FPS, MAP_HEIGHT, OFFSET, OFFSETBOOT, PADDLE_POSITION } from '../../game.constants';
import Paddle from '../Paddles/Paddle';

type Predict = {
	type: 'none' | 'paddle' | 'border' | 'stone' | 'limit',
	position: Vec2,
	velocity: Vec2
}

export default abstract class Bot {
	private ballPosition: Vec2 = [0, 0];
	private ballVelocity: Vec2 = [0, 0];
	private playerPosition: Vec2 = [0, 0];
	private botPosition: Vec2 = [0, 0];
	private stonePositions: Vec2[] = [];

	protected predict: Predict = { type: 'none', position: [0, 0], velocity: [0, 0] };

	public key: Paddle['key'] & { power: boolean, ulti: boolean } = {
		leftward: false,
		rightward: false,
		power: false,
		ulti: false
	};

	private predictBallTrajectory(ballPosition: Vec2 = this.ballPosition, ballVelocity: Vec2 = this.ballVelocity): Predict {
		const predictedPosition: Vec2 = [...ballPosition];
		const predictVelocity: Vec2 = [...ballVelocity];

		const formatFloatToFixed2 = (tuple: Vec2): Vec2 => {
			return [parseFloat(tuple[0].toFixed(2)), parseFloat(tuple[1].toFixed(2))]
		}

		while (true) {
			predictedPosition[0] += ballVelocity[0] * FPS;
			predictedPosition[1] += ballVelocity[1] * FPS;

			if (ballVelocity[0] === 0 && ballVelocity[1] === 0) {
				return { type: 'none', position: [0, 0], velocity: [0, 0] };
			}

			for (const stone of this.stonePositions) {
				const dx = predictedPosition[0] - stone[0];
				const dy = predictedPosition[1] - stone[1];

				if (Math.abs(dx) <= BALL_RADIUS + 0.25
					&& Math.abs(dy) <= BALL_RADIUS + 0.25) {
					if (PADDLE_POSITION > Math.abs(stone[0]) && Math.abs(dy) > Math.abs(dx)) {
						predictVelocity[1] *= -1;
					} else {
						predictVelocity[0] *= -1;
					}
					return { type: 'stone', position: formatFloatToFixed2(predictedPosition), velocity: formatFloatToFixed2(predictVelocity) };
				}
			}

			if ((predictedPosition[0] >= -PADDLE_POSITION
				&& predictedPosition[0] <= PADDLE_POSITION)
				&& (predictedPosition[1] <= -MAP_HEIGHT / 2 + OFFSET + BALL_RADIUS
					|| predictedPosition[1] >= MAP_HEIGHT / 2 - OFFSET - BALL_RADIUS)) {
				predictVelocity[1] *= -1;
				return { type: 'border', position: formatFloatToFixed2(predictedPosition), velocity: formatFloatToFixed2(predictVelocity) };
			}

			if (ballVelocity[0] < 0
				&& predictedPosition[1] >= this.playerPosition[1] - BALL_RADIUS - OFFSETBOOT
				&& predictedPosition[1] <= this.playerPosition[1] + BALL_RADIUS + OFFSETBOOT) {
				const collisionPoint: number = predictedPosition[1] - this.playerPosition[1];
				predictVelocity[0] *= -1;
				predictVelocity[1] = ((predictedPosition[1] > 2.16 || predictedPosition[1] < -2.16) ? -collisionPoint : collisionPoint) * 5;
				return { type: 'paddle', position: formatFloatToFixed2(predictedPosition), velocity: formatFloatToFixed2(predictVelocity) };
			}

			if (ballVelocity[0] > 0
				&& predictedPosition[1] >= this.botPosition[1] - BALL_RADIUS - OFFSETBOOT
				&& predictedPosition[1] <= this.botPosition[1] + BALL_RADIUS + OFFSETBOOT) {
				const collisionPoint: number = predictedPosition[1] - this.playerPosition[1];
				predictVelocity[0] *= -1;
				predictVelocity[1] = ((predictedPosition[1] > 2.16 || predictedPosition[1] < -2.16) ? -collisionPoint : collisionPoint) * 5;
				return { type: 'paddle', position: formatFloatToFixed2(predictedPosition), velocity: formatFloatToFixed2(predictVelocity) };
			}

			if (predictedPosition[0] <= -PADDLE_POSITION
				|| predictedPosition[0] >= PADDLE_POSITION) {
				return { type: 'limit', position: formatFloatToFixed2(predictedPosition), velocity: formatFloatToFixed2(predictVelocity) };
			}
		}
	}

	public handleKetEvent(): void {
		this.key.leftward = false;
		this.key.rightward = false;
		if (this.predict.type === 'none') return;
		// console.log(this.predict.type);

		let targetY: number = this.predict.position[1];
		if (this.ballVelocity[0] < 0) { // Player
			targetY = this.botPosition[1];
			if (this.predict.type === 'paddle') {
				targetY = this.playerPosition[1];
			} else if (this.predict.type === 'border') {
				targetY = 0;
			} else if (this.predict.type === 'stone') {
				targetY = this.predict.position[1];
			} else if (this.predict.type === 'limit') {
				targetY = 0;
			}
		} else { // Bot
			if (this.predict.type === 'paddle') return;
			if (this.predict.type === 'border') {
				if (this.predict.position[0] < 0) {
					targetY = 0;
				} else {
					const newPredict: Predict = this.predictBallTrajectory(this.predict.position, this.predict.velocity);
					if (newPredict.type === 'limit') { targetY = newPredict.position[1]; }
				}
			} else if (this.predict.type === 'stone') {
				if (this.predict.velocity[0] > 0) {
					const newPredict: Predict = this.predictBallTrajectory(this.predict.position, this.predict.velocity);
					if (newPredict.type === 'limit') { targetY = newPredict.position[1]; }
				} else {
					targetY = 0;
				}
			} else if (this.predict.type === 'limit') {
				targetY = this.predict.position[1];
			}
		}

		if (targetY < this.botPosition[1] - OFFSETBOOT) {
			this.key.leftward = true;
			this.key.rightward = false;
		} else if (targetY > this.botPosition[1] + OFFSETBOOT) {
			this.key.leftward = false;
			this.key.rightward = true;
		}
		return;
	}

	public update(ballPosition: Vec2, ballVelocity: Vec2, playerPosition: Vec2, botPosition: Vec2, stonePositions: Vec2[]) {
		this.ballPosition = ballPosition;
		this.ballVelocity = ballVelocity;
		this.playerPosition = playerPosition;
		this.botPosition = botPosition;
		this.stonePositions = stonePositions;
		this.predict = this.predictBallTrajectory();
	}

	abstract handlePowerEvent(): void;
	abstract handleUltiEvent(): void;
}
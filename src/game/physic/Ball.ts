import { Body, Circle } from 'p2-es';
import { BALL, BALL_RADIUS, BORDER, PADDLE, PADDLE_POSITION, STONE } from '../game.constants';
import { Vector3, formatTuple } from "../../types/physic.type";

export default class Ball {
	public body: Body;
	public impulse: [number, number];
	public score: number;
	public collision: number;
	public visible: 0 | 1 | 2 | 3;
	public isVisible: boolean;

	constructor() {
		const shape: Circle = new Circle({ radius: BALL_RADIUS });
		shape.collisionGroup = BALL;
		shape.collisionMask = PADDLE | BORDER | STONE;

		this.body = new Body({ mass: 1, position: [0, 0] });
		this.body.addShape(shape);
		this.impulse = [0, 0];
		this.score = 0;
		this.collision = 0;
		this.visible = 3;
		this.isVisible = true;
	}

	public copy(ball: Ball): void {
		this.impulse = [...ball.impulse];
		this.score = ball.score;
		this.body.position = [...ball.body.position];
		this.body.velocity = [...ball.body.velocity];
	}

	public isCollided() {
		this.collision++;
		this.isVisible = true;
		if (this.visible === 0 && this.body.velocity[0] > 0) {
			setTimeout(() => {
				this.isVisible = false;
			}, 50);
		} else if (this.visible === 1 && this.body.velocity[0] < 0) {
			setTimeout(() => {
				this.isVisible = false;
			}, 50);
		} else if (this.visible === 2) {
			setTimeout(() => {
				this.isVisible = false;
			}, 50);
		}
	}

	public start(): number {
		const direction: number = (this.score === -1 || this.score === 1) ? this.score : (Math.random() - 0.5 < 0) ? -1 : 1;
		this.score = 0;
		const interval = setInterval(() => {
			clearInterval(interval);
			this.impulse = [1 * direction, 0];
			this.body.velocity = [3 * direction, 0];
			this.body.position = [0, Math.random() * 0.1 - 0.05]
		}, 4000);
		return (direction === -1) ? 0 : 1;
	}

	public step(delta: number): void { // TMP - Utiliser delta
		if (this.body.position[0] < -PADDLE_POSITION - 2 || this.body.position[0] > PADDLE_POSITION + 2)
			this.score = (Math.sign(this.body.position[0]) < 0) ? -1 : 1;
		this.body.applyForce(this.impulse);
		return;
	}

	public reset(): void {
		this.body.position = [0, 0];
		this.body.velocity = [0, 0];
		this.impulse = [0, 0];
		this.visible = 3;
		this.isVisible = true;
		return;
	}

	get position(): Vector3 {
		return formatTuple(this.body.position);
	}

	get velocity(): Vector3 {
		return formatTuple(this.body.velocity);
	}
};
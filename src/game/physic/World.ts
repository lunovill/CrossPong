import Ball from "./Ball"
import Paddle from "./Paddle"
import {Box, Body, BeginContactEvent, World as P2World} from 'p2-es'
import { BALL, BORDER, FPS, MAP_HEIGHT, MAP_WIDTH, OFFSET, PADDLE, PADDLE_POSITION } from '../game.constants'

export class World extends P2World {
	private static createBorder(location: number): Body {
		let shape: Box = new Box({ width: MAP_WIDTH * 2, height: OFFSET * 2 });
		shape.collisionGroup = BORDER;
		shape.collisionMask = BALL | PADDLE;

		let body: Body = new Body({ mass: 0, position: [0, (MAP_HEIGHT / 2 + OFFSET) * location] });
		body.addShape(shape);
		return body;
	}

	private ball: { body: Ball, isDestroyed: boolean };
	private interval: number | undefined;
	private paddles: [Paddle, Paddle];

	constructor(ball: { body: Ball, isDestroyed: boolean }, paddles: [Paddle, Paddle]) {
		super({ gravity: [0, 0] });
		this.addBody(paddles[0].body);
		this.addBody(paddles[1].body);
		this.addBody(World.createBorder(-1));
		this.addBody(World.createBorder(1));

		this.ball = ball;
		this.interval = undefined;
		this.paddles = paddles;

		this.handleBeginContact = this.handleBeginContact.bind(this);
	}

	public allStep(): void {
		(this.ball.isDestroyed) && this.removeBody(this.ball.body.body);
		this.ball.body.step(FPS);
		this.paddles.forEach(p => {
			p.canRemoveBodies().forEach(body => this.removeBody(body));
			p.step(FPS);
		});
		this.step(FPS);
	};

	private handlePaddleCollision(ball: Ball, paddle: Paddle): void {
		ball.collision++;
		const collisionPoint: number = ball.body.position[1] - paddle.body.position[1];
		const speedFactor = this.paddles[0].handleCollision(this.paddles[0] === paddle)
			* this.paddles[1].handleCollision(this.paddles[1] === paddle);

		ball.impulse[0] = (1 - Math.abs(collisionPoint)) * Math.sign(ball.impulse[0] * -1);
		ball.impulse[1] = ((ball.body.position[1] > 2.15 || ball.body.position[1] < -2.15) ? -collisionPoint : collisionPoint);
		ball.body.velocity[0] *= -1 * speedFactor;
		ball.body.velocity[1] = ball.impulse[1] * 5 * speedFactor;
		return;
	}

	private handleBorderCollision = (ball: Ball) => {
		console.log('collision');
		ball.collision++;
		ball.impulse[1] *= -1;
		ball.body.velocity[1] *= -1;
		return;
	};

	private handleStoneCollision = (ball: Ball, stone: Paddle['skillBodies'][0]) => {
		ball.collision++;
		const dx = ball.body.position[0] - stone.body.position[0];
		const dy = ball.body.position[1] - stone.body.position[1];

		if (PADDLE_POSITION > Math.abs(stone.body.position[0]) && Math.abs(dy) > Math.abs(dx)) {
			ball.impulse[1] *= -1;
			ball.body.velocity[1] *= -1;
		} else {
			ball.impulse[0] *= -1;
			ball.body.velocity[0] *= -1;
		}
		stone.isDestroyed = true;
		return;
	};

	private handleBeginContact(event: BeginContactEvent): void {
		const isBall = (body: Body): Ball | undefined => {
			if (body === this.ball.body.body)
				return this.ball.body;
			return this.paddles[0].isSkillBalls(body) ?? this.paddles[1].isSkillBalls(body);
		};

		const isPaddle = (body: Body): Paddle | undefined => {
			return this.paddles.find(p => p.body === body);
		};

		const isStone = (body: Body): Paddle['skillBodies'][0] | undefined => {
			return this.paddles[0].isSkillBodies(body) ?? this.paddles[1].isSkillBodies(body);
		};

		if (isBall(event.bodyA) && isPaddle(event.bodyB)) {
			this.handlePaddleCollision(isBall(event.bodyA)!, isPaddle(event.bodyB)!);
		} else if (isBall(event.bodyB) && isPaddle(event.bodyA)) {
			this.handlePaddleCollision(isBall(event.bodyB)!, isPaddle(event.bodyA)!);
		} else if (isBall(event.bodyA) && isStone(event.bodyB)) {
			this.handleStoneCollision(isBall(event.bodyA)!, isStone(event.bodyB)!);
		} else if (isBall(event.bodyB) && isStone(event.bodyA)) {
			this.handleStoneCollision(isBall(event.bodyB)!, isStone(event.bodyA)!);
		} else if (isBall(event.bodyA) || isBall(event.bodyB)) {
			this.handleBorderCollision(isBall(event.bodyA) ?? isBall(event.bodyB)!);
		}
		return;
	}

	public pause(): void {
		this.off('beginContact', this.handleBeginContact);
		clearInterval(this.interval);
	}

	public play(): void {
		this.on('beginContact', this.handleBeginContact);
		this.interval = setInterval(this.allStep.bind(this), FPS * 1000);
		return;
	}

	public stop(): void {
		this.pause();
		this.clear();
	};
};
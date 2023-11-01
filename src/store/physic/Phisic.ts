import { EventEmitter } from "events";
import Ball from "./Ball";
import Paddle from "./Paddle";
import { World } from "./World";
import { Vector3 } from "../../types/physic.type";
import { bot } from "./bot";
import { MapTheme } from "../../types/machine";
import MedievalPaddle, { MedievalSkillInfoProps } from "./MedievalPaddle";
import WesternPaddle, { WesternSkillInfoProps } from "./WesternPaddle";
import NinjaPaddle, { NinjaSkillInfoProps } from "./NinjaPaddle";
import RetroPaddle, { RetroSkillInfoProps } from "./RetroPaddle";

export type SkillInfoProps = MedievalSkillInfoProps | WesternSkillInfoProps | NinjaSkillInfoProps | RetroSkillInfoProps;

interface PaddleInfoProps {
	position: Vector3,
	velocity: Vector3,
	collision: number,
	skill: SkillInfoProps,
}

interface BallsInfoProps {
	position: Vector3,
	velocity: Vector3,
	collision: number
}

function createPaddle(theme: MapTheme, location: number): Paddle {
	switch (theme) {
		case MapTheme.MEDIEVAL:
			return new MedievalPaddle(location);
		case MapTheme.WESTERN:
			return new WesternPaddle(location);
		case MapTheme.NINJA:
			return new NinjaPaddle(location);
		case MapTheme.RETRO:
			return new RetroPaddle(location);
		default:
			throw new Error('Invalid paddle type');
	}
}

export default class Physic extends EventEmitter {
	private ball: { body: Ball, isDestroyed: boolean };
	private paddles: [Paddle, Paddle];
	private world: World;

	constructor(paddleNeg: MapTheme, paddlePos: MapTheme) {
		super();

		this.ball = { body: new Ball, isDestroyed: false };
		this.paddles = [createPaddle(paddleNeg, -1), createPaddle(paddlePos, 1)];
		this.world = new World(this.ball, this.paddles);
	};

	public pause(): void { this.world.pause(); }

	public play(): void { this.world.play(); }

	public setKeys(index: number, key: Paddle['key']) { this.paddles[index].key = key; }

	public setPower(index: number, power: boolean): void {
		const balls: { body: Ball, isDestroyed: boolean }[] = [...([] as { body: Ball, isDestroyed: boolean }[]).concat(...this.paddles.map(p => p.skillBalls)), this.ball].filter(b => !b.isDestroyed);
		if (power && balls[0].body.velocity.x === 0 && balls[0].body.velocity.y === 0) return;
		this.paddles[index]
			.setPower(power, balls.map(b => b.body.position))
			.forEach(body => this.world.addBody(body));
		return;
	}

	public setUlti(index: number, ulti: boolean): void {
		const balls: { body: Ball, isDestroyed: boolean }[] = [...([] as { body: Ball, isDestroyed: boolean }[]).concat(...this.paddles.map(p => p.skillBalls)), this.ball].filter(b => !b.isDestroyed);
		if (ulti && balls[0].body.velocity.x === 0 && balls[0].body.velocity.y === 0) return;
		this.paddles[index]
			.setUlti(ulti, balls[0].body)
			.forEach(body => this.world.addBody(body));
	}

	public start(): number {
		this.world.play();
		this.ball.isDestroyed = false;
		if (!this.world.bodies.find(b => b === this.ball.body.body))
			this.world.addBody(this.ball.body.body);
		return this.ball.body.start();
	}

	public stop(): void { this.world.stop() };

	get ballsInfo(): BallsInfoProps[] {
		const balls: { body: Ball, isDestroyed: boolean }[] = [...([] as { body: Ball, isDestroyed: boolean }[]).concat(...this.paddles.map(p => p.skillBalls)), this.ball].filter(b => !b.isDestroyed);
		for (let i = balls.length - 1; i >= 0; i--) {
			if (balls[i].body.score) {
				if (balls.length === 1) {
					this.paddles.forEach(p => {
						p.setPower(false, []);
						p.setUlti(false, balls[i].body);
						p.reset();
					});
				}
				balls[i].isDestroyed = true;
				balls[i].body.reset();
				this.emit('score', (Math.sign(balls[i].body.score) === -1) ? 1 : 0, balls.length === 1 ? true : false);
				balls.splice(i, 1);
			}
		}

		return balls.map(b => ({
			position: b.body.position,
			velocity: b.body.velocity,
			collision: b.body.collision
		}));
	}

	get bot(): Paddle['key'] {
		const balls: { body: Ball, isDestroyed: boolean }[] = [...([] as { body: Ball, isDestroyed: boolean }[]).concat(...this.paddles.map(p => p.skillBalls)), this.ball].filter(b => !b.isDestroyed);
		return bot(balls.sort((a, b) => b.body.body.velocity[1] - a.body.body.velocity[1])[0].body, this.paddles[0], this.paddles[1])
	}

	get paddlesInfo(): [PaddleInfoProps, PaddleInfoProps] {
		return [{
			position: this.paddles[0].position,
			velocity: this.paddles[0].velocity,
			collision: this.paddles[0].collision,
			skill: this.paddles[0].skillInfo
		}, {
			position: this.paddles[1].position,
			velocity: this.paddles[1].velocity,
			collision: this.paddles[1].collision,
			skill: this.paddles[1].skillInfo
		}]
	}
};
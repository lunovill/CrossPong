import { EventEmitter } from "events";
import Ball from "./Ball";
import Paddle from "./Paddles/Paddle";
import { World } from "./World";
import { SkillInfoProps, Vector3 } from "../../types/physic.type";
import { MapTheme } from "../../types/machine.type";
import MedievalPaddle from "./Paddles/MedievalPaddle";
import WesternPaddle from "./Paddles/WesternPaddle";
import NinjaPaddle from "./Paddles/NinjaPaddle";
import RetroPaddle from "./Paddles/RetroPaddle";
import { Body } from "p2-es";

interface PaddleInfoProps {
	position: Vector3,
	velocity: Vector3,
	collision: number,
	skill: SkillInfoProps,
	cooldown: number,
	time: number
}

interface BallInfoProps {
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
			.setUlti(ulti, balls.map(b => b.body))
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

	public restart(): void {
		this.paddles.forEach(p => {
			p.ulti.isActive = false,
				p.ulti.isAvailable = true
		});
	}

	get ballsInfo(): BallInfoProps[] {
		const balls: { body: Ball, isDestroyed: boolean }[] = [...([] as { body: Ball, isDestroyed: boolean }[]).concat(...this.paddles.map(p => p.skillBalls)), this.ball].filter(b => !b.isDestroyed);
		for (let i = balls.length - 1; i >= 0; i--) {
			if (balls[i].body.score) {
				if (balls.length === 1) {
					this.paddles.forEach(p => {
						p.setPower(false, []);
						p.setUlti(false, balls.map(b => b.body));
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

	get bot(): Paddle['key'] & { power: boolean, ulti: boolean } {
		const balls: { body: Ball, isDestroyed: boolean }[] = [
			...([] as { body: Ball, isDestroyed: boolean }[])
				.concat(...this.paddles.map(p => p.skillBalls)),
			this.ball
		].filter(b => !b.isDestroyed)
			.sort((a, b) => b.body.body.position[0] - a.body.body.position[0]);
		const ball: Ball = ((): Ball => {
			if (balls.length > 1) {
				const tmp: { body: Ball, isDestroyed: boolean }[] = balls.filter(b => b.body.body.velocity[0] > 0);
				if (tmp.length) return tmp[0].body;
			}
			return balls[0].body;
		})();

		this.paddles[1].bot.update(
			ball.isVisible ? ball.body.position : undefined,
			ball.isVisible ? balls[0].body.body.velocity : undefined,
			(this.paddles[1] instanceof RetroPaddle && this.paddles[1].power.isActive) ? undefined  : this.paddles[0].body.position,
			(this.paddles[0] instanceof RetroPaddle && this.paddles[0].power.isActive) ? undefined  : this.paddles[1].body.position,
			[...([] as { body: Body, isDestroyed: boolean }[])
				.concat(...this.paddles.map(p => p.skillBodies))
			].filter((b, i) => (i < 2 && !b.isDestroyed))
				.map(b => b.body.position));
		this.paddles[1].bot.handleKetEvent();
		this.paddles[1].bot.handlePowerEvent();
		(this.paddles[1].ulti.isAvailable) && this.paddles[1].bot.handleUltiEvent();

		return this.paddles[1].bot.key;
	}

	get paddlesInfo(): [PaddleInfoProps, PaddleInfoProps] {
		return this.paddles.map(p => {
			if (p.power.start) {
				const time = Date.now() - p.power.start;
				if (time >= p.power.cooldown) { p.power.start = 0; p.power.time = 0; }
				else { p.power.time = p.power.cooldown - time }
			}

			return {
				position: p.position,
				velocity: p.velocity,
				collision: p.collision,
				skill: p.skillInfo,
				cooldown: p.power.cooldown,
				time: p.power.time
			}
		}) as [PaddleInfoProps, PaddleInfoProps];
	}
};
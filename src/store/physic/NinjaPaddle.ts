import { Body } from "p2-es";
import Paddle from "./Paddle";
import { FPS } from "./config";
import { Vector3 } from "../../types/physic.type";
import Ball from "./Ball";

export interface NinjaSkillInfoProps {
	power: { isActive: boolean, effect: boolean, factor: number },
	ulti: {
		isActive: boolean,
		balls: { position: Vector3, velocity: Vector3 }[]
	}
};

export default class NinjaPaddle extends Paddle {
	private effect: boolean;

	constructor(location: number) {
		super(location);

		this.effect = false;
		this.skillBalls.push({ body: new Ball, isDestroyed: true });
		this.skillBalls.push({ body: new Ball, isDestroyed: true });
	}

	public applyPower(): void {
		this.body.velocity = [0, 0];
		return;
	}

	public canRemoveBodies(): Body[] {
		this.skillBalls.forEach(ball => ball.body?.step(FPS));
		return this.skillBalls
			.filter((_, i) => this.skillBalls[i].isDestroyed)
			.map(ball => ball.body.body);
	}

	public handleCollision(isMe: boolean): number {
		const factor: number = this.factor;
		if (isMe) {
			(this.factor > 1.2) && (this.effect = true);
			this.factor = 1;
			this.collision++;
		} else {
			this.effect = false;
		}
		return factor;
	}

	public setPower(power: boolean, _: Vector3[]): Body[] {
		this.power = power;
		(power && this.factor < 1.5) && (this.factor += 0.01);
		(!power) && (this.factor = 1);
		return [];
	}

	public setUlti(ulti: boolean, ball: Ball): Body[] {
		if (ulti && !this.ulti) {
			this.ulti = true;
			this.skillBalls.forEach((b, i) => {
				b.body.copy(ball);
				b.body.body.velocity = [
					Math.cos((2 + Math.random()) * Math.PI / 3 * (i * 2 - 1)) * ball.body.velocity[0] - Math.sin((2 + Math.random()) * Math.PI / 3 * (i * 2 - 1)) * ball.body.velocity[1],
					Math.sin((2 + Math.random()) * Math.PI / 3 * (i * 2 - 1)) * ball.body.velocity[0] + Math.cos((2 + Math.random()) * Math.PI / 3 * (i * 2 - 1)) * ball.body.velocity[1]
				];
				const lenght = Math.sqrt(b.body.body.velocity[0] ** 2 + b.body.body.velocity[1] ** 2);
				b.body.impulse = [b.body.body.velocity[0] / lenght, b.body.body.velocity[1] / lenght];
				b.body.body.velocity = [b.body.impulse[0] * i, b.body.impulse[1] * i];
				b.isDestroyed = false;
			});
			return this.skillBalls.map(ball => ball.body.body);
		}
		if (!ulti) {
			this.ulti = false;
			this.skillBalls.forEach(b => b.isDestroyed = true);
		}
		return [];
	}

	get skillInfo(): NinjaSkillInfoProps {
		return {
			power: { isActive: this.power, effect: this.effect, factor: (this.factor - 1) * 2 },
			ulti: {
				isActive: this.ulti, balls: this.skillBalls
					.filter(ball => !ball.isDestroyed)
					.map(ball => ({
						position: ball.body.position,
						velocity: ball.body.velocity
					}))
			}
		}
	}
};
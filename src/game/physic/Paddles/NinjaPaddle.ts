import { Body } from "p2-es";
import Paddle from "./Paddle";
import { COOLDOWN, FPS } from "../../game.constants";
import { Vector3 } from "../../../types/physic.type";
import Ball from "../Ball";
import NinjaBot from "../Bots/NinjaBot";

export interface NinjaSkillInfoProps {
	power: { isActive: boolean, effect: boolean, factor: number },
	ulti: Paddle['ulti'] & { balls: { position: Vector3, velocity: Vector3 }[] }
};

export default class NinjaPaddle extends Paddle {
	private effect: boolean;

	public bot: NinjaBot;

	constructor(location: number) {
		super(location);

		this.power.cooldown = COOLDOWN.Ninja;
		this.effect = false;
		this.skillBalls.push({ body: new Ball, isDestroyed: true });
		this.skillBalls.push({ body: new Ball, isDestroyed: true });
		this.bot = new NinjaBot;
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
		if (this.power.time) return [];
		if (!power && this.power.isActive) {
			this.power.start = Date.now();
			this.power.time = this.power.cooldown;
		}
		this.power.isActive = power;
		(power && this.factor < 1.5) && (this.factor += 0.01);
		(!power) && (this.factor = 1);
		return [];
	}

	public setUlti(ulti: boolean, ball: Ball[]): Body[] {
		if (ulti && this.ulti.isAvailable && !this.ulti.isActive) {
			this.ulti.isActive = true;
			this.ulti.isAvailable = false;
			this.skillBalls.forEach((b, i) => {
				b.body.copy(ball[0]);
				b.body.body.velocity = [
					Math.cos((2 + Math.random()) * Math.PI / 3 * (i * 2 - 1)) * ball[0].body.velocity[0] - Math.sin((2 + Math.random()) * Math.PI / 3 * (i * 2 - 1)) * ball[0].body.velocity[1],
					Math.sin((2 + Math.random()) * Math.PI / 3 * (i * 2 - 1)) * ball[0].body.velocity[0] + Math.cos((2 + Math.random()) * Math.PI / 3 * (i * 2 - 1)) * ball[0].body.velocity[1]
				];
				const lenght = Math.sqrt(b.body.body.velocity[0] ** 2 + b.body.body.velocity[1] ** 2);
				b.body.impulse = [b.body.body.velocity[0] / lenght, b.body.body.velocity[1] / lenght];
				b.body.body.velocity = [b.body.impulse[0] * i, b.body.impulse[1] * i];
				b.isDestroyed = false;
			});
			return this.skillBalls.map(ball => ball.body.body);
		}
		if (!ulti) {
			this.ulti.isActive = false;
			this.skillBalls.forEach(b => b.isDestroyed = true);
		}
		return [];
	}

	get skillInfo(): NinjaSkillInfoProps {
		return {
			power: { isActive: this.power.isActive, effect: this.effect, factor: (this.factor - 1) * 2 },
			ulti: {
				...this.ulti,
				balls: this.skillBalls
					.filter(ball => !ball.isDestroyed)
					.map(ball => ({
						position: ball.body.position,
						velocity: ball.body.velocity
					}))
			}
		}
	}
};
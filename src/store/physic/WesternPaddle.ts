import { Body } from "p2-es";
import { Vector3 } from "../../types/physic.type";
import Ball from "./Ball";
import Paddle from "./Paddle";

export interface WesternSkillInfoProps {
	power: { isActive: boolean },
	ulti: { isActive: boolean }
};

export default class WesternPaddle extends Paddle {
	constructor(location: number) {
		super(location);
	}

	public applyPower(): void {
		this.body.velocity[1] = Math.sign(this.body.velocity[1]) * 15;
		return;
	}

	public canRemoveBodies(): Body[] { return []; }

	public handleCollision(isMe: boolean): number {
		if (isMe) {
			(this.ulti) && (this.factor = 1.6);
			this.collision++
		} else {
			(this.ulti) && (this.factor = 0.4);
		}
		return this.factor;
	}

	public setPower(power: boolean, _: Vector3[]): Body[] {
		if (power && !this.power && Math.abs(this.body.velocity[1]) > 1) {
			this.power = true;
			setTimeout(() => {
				this.power = false;
			}, 50);
		}
		(!power) && (this.power = false);
		return [];
	}

	public setUlti(ulti: boolean, _: Ball): Body[] {
		(ulti && !this.ulti) && (this.ulti = true);
		if (!ulti) {
			this.factor = 1;
			this.ulti = false;
		}
		return [];
	}

	get skillInfo(): WesternSkillInfoProps {
		return {
			power: { isActive: this.power },
			ulti: { isActive: this.ulti }
		};
	}
};
import { Body } from "p2-es";
import { Vector3 } from "../../../types/physic.type";
import Ball from "../Ball";
import Paddle from "./Paddle";
import { COOLDOWN } from "../../game.constants";

export interface WesternSkillInfoProps {
	power: { isActive: boolean },
	ulti: Paddle['ulti']
};

export default class WesternPaddle extends Paddle {
	constructor(location: number) {
		super(location);

		this.power.cooldown = COOLDOWN.Western;
	}

	public applyPower(): void {
		this.body.velocity[1] = Math.sign(this.body.velocity[1]) * 15;
		return;
	}

	public canRemoveBodies(): Body[] { return []; }

	public handleCollision(isMe: boolean): number {
		if (isMe) {
			(this.ulti.isActive) && (this.factor = 1.6);
			this.collision++
		} else {
			(this.ulti.isActive) && (this.factor = 0.4);
		}
		return this.factor;
	}

	public setPower(power: boolean, _: Vector3[]): Body[] {
		if (this.power.time) return [];
		if (power && !this.power.isActive && Math.abs(this.body.velocity[1]) > 1) {
			this.power.isActive = true;
			this.power.start = Date.now();
			this.power.time = this.power.cooldown;
			setTimeout(() => {
				this.power.isActive = false;
			}, 50);
		}
		(!power) && (this.power.isActive = false);
		return [];
	}

	public setUlti(ulti: boolean, _: Ball): Body[] {
		if (ulti && this.ulti.isAvailable && !this.ulti.isActive){
			this.ulti.isActive = true;
			this.ulti.isAvailable = false;
		} else if (!ulti) {
			this.factor = 1;
			this.ulti.isActive = false;
		}
		return [];
	}

	get skillInfo(): WesternSkillInfoProps {
		return {
			power: { isActive: this.power.isActive },
			ulti: this.ulti
		};
	}
};
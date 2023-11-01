import { Body } from "p2-es";
import { Vector3 } from "../../types/physic.type";
import Paddle from "./Paddle";
import Ball from "./Ball";

export interface RetroSkillInfoProps {
	power: { isActive: boolean },
	ulti: { isActive: boolean, effect: boolean }
};

export default class RetroPaddle extends Paddle {
	private effect: boolean;

	constructor(location: number) {
		super(location);

		this.effect = false
	}

	public applyPower(): void { return; }

	public canRemoveBodies(): Body[] { return []; }

	public handleCollision(isMe: boolean): number {
		if (isMe) {
			(this.ulti) && (this.effect = true);
			this.collision++;
		} else {
			this.effect = false;
		}
		return this.factor;
	}

	public setPower(power: boolean, _: Vector3[]): Body[] {
		if (power && !this.power) {
			this.power = true;
			setTimeout(() => {
				this.power = false;
			}, 3000);
		}
		(!power) && (this.power = false);
		return [];
	}

	public setUlti(ulti: boolean, _: Ball): Body[] {
		if (ulti && !this.ulti) {
			this.ulti = true;
		} else if (!ulti) {
			this.ulti = false;
			this.effect = false;
		}
		return [];
	}

	get skillInfo(): RetroSkillInfoProps {
		return {
			power: { isActive: this.power },
			ulti: { isActive: this.ulti, effect: this.effect }
		};
	}
};
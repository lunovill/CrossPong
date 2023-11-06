import { Body } from "p2-es";
import { Vector3 } from "../../../types/physic.type";
import Paddle from "./Paddle";
import Ball from "../Ball";
import { COOLDOWN } from "../../game.constants";

export interface RetroSkillInfoProps {
	power: { isActive: boolean },
	ulti: Paddle['ulti'] & { effect: boolean }
};

export default class RetroPaddle extends Paddle {
	private effect: boolean;

	constructor(location: number) {
		super(location);

		this.power.cooldown = COOLDOWN.Retro;
		this.effect = false
	}

	public applyPower(): void { return; }

	public canRemoveBodies(): Body[] { return []; }

	public handleCollision(isMe: boolean): number {
		if (isMe) {
			(this.ulti.isActive) && (this.effect = true);
			this.collision++;
		} else {
			this.effect = false;
		}
		return this.factor;
	}

	public setPower(power: boolean, _: Vector3[]): Body[] {
		if (this.power.time) return [];
		if (power && !this.power.isActive) {
			this.power.isActive = true;
			this.power.start = Date.now();
			this.power.time = this.power.cooldown;
			setTimeout(() => {
				this.power.isActive = false;
			}, 3000);
		}
		(!power) && (this.power.isActive = false);
		return [];
	}

	public setUlti(ulti: boolean, _: Ball): Body[] {
		if (ulti && !this.ulti.isActive) {
			this.ulti.isActive = true;
			this.ulti.isAvailable = false;
		} else if (!ulti) {
			this.ulti.isActive = false;
			this.effect = false;
		}
		return [];
	}

	get skillInfo(): RetroSkillInfoProps {
		return {
			power: { isActive: this.power.isActive },
			ulti: { ...this.ulti, effect: this.effect }
		};
	}
};
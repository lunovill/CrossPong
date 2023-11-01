import { Body, Box } from "p2-es";
import Paddle from "./Paddle";
import { BALL, BALL_RADIUS, MAP_HEIGHT, PADDLE_POSITION, STONE } from "./config";
import { Vector3 } from "../../types/physic.type";
import Ball from "./Ball";

export interface MedievalSkillInfoProps {
	power: { isActive: boolean, left: boolean, right: boolean },
	ulti: { isActive: boolean, stones: boolean[] }
};

export default class MedievalPaddle extends Paddle {
	private static createStone(width: number, height: number, x: number, y: number, locationX: number, locationY: number): Body {
		let shape: Box = new Box({ width, height });
		shape.collisionGroup = STONE;
		shape.collisionMask = BALL;

		let body: Body = new Body({ mass: 0, position: [x * locationX, y * locationY] });
		body.addShape(shape);
		return body;
	}

	constructor(location: number) {
		super(location);

		const x = PADDLE_POSITION + 0.5;
		this.skillBodies = [{
			body: MedievalPaddle.createStone(0.5, 0.5, 1, MAP_HEIGHT / 4, this.location, -1),
			isDestroyed: true
		}, {
			body: MedievalPaddle.createStone(0.5, 0.5, 1, MAP_HEIGHT / 4, this.location, 1),
			isDestroyed: true
		}];
		for (let i = 0; i < 4; i++) {
			const y = MAP_HEIGHT * 0.25 * i - MAP_HEIGHT * 0.375;
			this.skillBodies.push({
				body: (MedievalPaddle.createStone(0.2, 1, x + (i % 2 ? -0.05 : 0.05), y, location, 1)),
				isDestroyed: false
			});
		}
	}

	public applyPower(): void { return; }

	public canRemoveBodies(): Body[] {
		return this.skillBodies
			.filter(stone => stone.isDestroyed)
			.map(stone => stone.body);
	}

	public handleCollision(isMe: boolean): number {
		(isMe) && this.collision++;
		return this.factor;
	}

	public setPower(power: boolean, balls: Vector3[]): Body[] {
		if (power && !this.power && Math.sign(this.body.position[1])) {
			const locationX = this.location;
			const locationY = Math.sign(this.body.position[1]);
			const left = 1 * locationX - 0.3;
			const right = 1 * locationX + 0.3;
			const top = (MAP_HEIGHT / 4 * locationY) - 0.3;
			const bottom = (MAP_HEIGHT / 4 * locationY) + 0.3;

			if (balls.every(ball => ball.x + BALL_RADIUS <= left || ball.x - BALL_RADIUS >= right ||
				ball.y + BALL_RADIUS <= top || ball.y - BALL_RADIUS >= bottom)) {
				this.power = true;
				const index = (Math.sign(this.body.position[1]) + 1) / 2;
				this.skillBodies[index].isDestroyed = false;
				return [this.skillBodies[index].body];
			}
		}
		if (!power) {
			(this.skillBodies[0].isDestroyed = true);
			(this.skillBodies[1].isDestroyed = true);
		}
		return [];
	}

	public setUlti(ulti: boolean, _: Ball): Body[] {
		if (ulti && !this.ulti) {
			this.ulti = true;
			return this.skillBodies.slice(2).map(stone => stone.body);
		}
		if (!ulti && this.ulti) {
			this.ulti = false;
			this.skillBodies.slice(2).forEach(b => b.isDestroyed = true);
		}
		return [];
	}

	get skillInfo(): MedievalSkillInfoProps {
		const left: boolean = !!(!this.skillBodies[0].isDestroyed)
		const right: boolean = !!(!this.skillBodies[1].isDestroyed)
		this.power = (left || right);
		return (this.location === 1) ? {
			power: { isActive: this.power, left, right },
			ulti: { isActive: this.ulti, stones: this.skillBodies.slice(2).map(stone => !stone.isDestroyed) }
		} : {
			power: { isActive: this.power, left: right, right: left },
			ulti: { isActive: this.ulti, stones: this.skillBodies.slice(2).map(stone => !stone.isDestroyed).reverse() }
		}
	}
};

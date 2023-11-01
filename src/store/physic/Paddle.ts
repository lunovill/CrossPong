import { Body, Box } from "p2-es";
import { BALL, BORDER, PADDLE, PADDLE_DAMPING, PADDLE_HEIGHT, PADDLE_POSITION, PADDLE_SPEED, PADDLE_WIDTH } from "./config";
import { Vector3, formatTuple } from "../../types/physic.type";
import Ball from "./Ball";
import { SkillInfoProps } from "./Phisic";

export default abstract class Paddle {
	public body: Body;
	public collision: number;
	public factor: number;
	public key: { leftward: boolean, rightward: boolean };
	public location: number;
	public power: boolean;
	public skillBalls: { body: Ball, isDestroyed: boolean }[];
	public ulti: boolean;

	protected skillBodies: { body: Body, isDestroyed: boolean }[];

	constructor(location: number) {
		let shape: Box = new Box({ width: PADDLE_WIDTH, height: PADDLE_HEIGHT });
		shape.collisionGroup = PADDLE;
		shape.collisionMask = BALL | BORDER;

		this.body = new Body({ mass: 1, position: [PADDLE_POSITION * location, 0] });
		this.body.addShape(shape);
		this.body.damping = PADDLE_DAMPING;
		this.collision = 0;
		this.factor = 1;
		this.key = { leftward: false, rightward: false };
		this.location = location;
		this.power = false;
		this.skillBodies = [];
		this.skillBalls = [];
		this.ulti = false;
	}

	abstract applyPower(): void
	abstract canRemoveBodies(): Body[];
	abstract handleCollision(isMe: boolean): number;
	abstract setPower(power: boolean, ball: Vector3[]): Body[];
	abstract setUlti(ulti: boolean, ball: Ball): Body[];

	public isSkillBodies(body: Body): Paddle['skillBodies'][0] | undefined {
		return this.skillBodies.find(skillBody => skillBody.body === body);
	}

	public isSkillBalls(body: Body): Ball | undefined {
		return this.skillBalls.find(skillBody => skillBody.body?.body === body)?.body;
	}

	public step(delta: number): void {
		const location = this.location;
		let impulse: number[] = [0, 0];

		if (this.key.leftward)
			impulse[1] = PADDLE_SPEED * -location * delta;
		if (this.key.rightward)
			impulse[1] = PADDLE_SPEED * location * delta;
		if (this.power)
			this.applyPower();
		this.body.applyForce(impulse);
		this.body.angle = 0;
		this.body.position[0] = PADDLE_POSITION * location;
		return;
	}

	public reset(): void {
		this.body.position[1] = 0;
		this.body.velocity[1] = 0;
		return;
	}

	abstract get skillInfo(): SkillInfoProps

	get position(): Vector3 {
		return formatTuple(this.body.position);
	}

	get velocity(): Vector3 {
		return formatTuple(this.body.velocity);
	}
};
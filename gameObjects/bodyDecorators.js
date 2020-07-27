import { IBody } from "./common.js";
import { Vector2, Vector3 } from "../geometry/vectors.js";
import { throwIfNotInstance } from "../tools/utils.js";

export class BodyDecorator extends IBody {

	get pos() { return this.#body.pos }
	get size() { return this.#body.size }
	get state() { return this.#body.state }
	#body;

	constructor(body) {
		super();
		this.#body = throwIfNotInstance(body, IBody);
	}

	update() {
		this.#body.update();
	}
}

export class MovingBodyDec extends BodyDecorator {
	#deltaTime = 0.1;
	get deltaTime() { return this.#deltaTime }

	#velocity = new Vector2();
	get velocity() { return this.#velocity }

	constructor(deltaTime, body) {
		super(body);
		this.#deltaTime = deltaTime;
	}

	update() {
		const dp = new Vector3(this.#velocity.x, this.#velocity.y, 0).
			scMul(this.#deltaTime);
		this.pos.add(dp);
		super.update();
	}
}

export class MassivBodyDec extends BodyDecorator {
	#mass;
	get mass() { return this.#mass }

	#pulses;

	#velocity = new Vector2();
	get velocity() { return this.#velocity }

	constructor(mass, pulses, body) {
		super(body);

		if (body instanceof MovingBodyDec)
			this.#velocity = body.velocity;

		this.#mass = mass;
		this.#pulses = pulses;
	}

	#threshold = 0.01;
	
	update() {
		const pulses = this.#pulses.get();
		if (pulses && pulses.length > 0) {
			const sumPuls = new Vector2();
			pulses.forEach(puls => {
				sumPuls.add(puls);
			});

			if (sumPuls.length > this.#threshold) {
				const dv = sumPuls.scMul(1 / this.#mass);
				this.#velocity.add(dv);
			}
		}
		super.update();
	}
}
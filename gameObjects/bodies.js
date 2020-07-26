import { throwIfNotInstance } from "../tools/utils.js";
import { Vector2, Vector3 } from "../geometry/vectors.js";
import { Input } from "../inputs/input.js";
import { IBody } from "./common.js";
import { State, IdleStates, MoveStates } from "./state.js";

export class Body extends IBody {

	#pos = new Vector3();
	get pos() { return this.#pos }

	#size = new Vector3();
	get size() { return this.#size }

	constructor(x, y, z, wi, he) {
		super();
		this.#pos = new Vector3(x, y, z);
		this.#size = new Vector3(wi, he, 0);
	}

	update() { }
}

export class MovingBody extends Body {
	#deltaTime=0.1;
	get deltaTime() { return this.#deltaTime }

	#velocity = new Vector2();
	get velocity() { return this.#velocity }

	update() {
		super.update();

		const dp = new Vector3(this.#velocity.x, this.#velocity.y, 0).
			scMul(this.#deltaTime);
		this.pos.add(dp);
	}
}

export class MassivBody extends MovingBody {
	#mass = 1;
	get mass() { return this.#mass }

	constructor(x, y, z, wi, he, mass) {
		super(x, y, z, wi, he);
		this.#mass = mass;
	}

	pulse(vector) {
		const p = new Vector2(vector.x, vector.y);
		if (p.length > 0) {
			const dv = p.scMul(1 / this.#mass);
			this.velocity.add(dv);
			console.log(this.velocity);
		}
	}

	hit(body) {
		throw ('hit not implemented yet..')
	}
}
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
	#deltaTime = 0.1;
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

// export class BodyDecorator extends IBody {

// 	get pos() { return this.#object.pos }
// 	get size() { return this.#object.size }
// 	get state() { return this.#object.state }
// 	#object;

// 	constructor(object) {
// 		super();
// 		this.#object = throwIfNotInstance(object, IBody);
// 	}

// 	update() {
// 		this.#object.update();
// 	}
// }

// export class ShiftedBody extends BodyDecorator {
// 	#shift;
// 	constructor(shift, object) {
// 		super(object);

// 		this.#shift = throwIfNotInstance(shift, Vector2);
// 	}

// 	get pos() {
// 		const pos = super.pos;
// 		return new Vector3(pos.x, pos.y, pos.z).
// 			add(this.#shift);
// 	}
// }

// export class ScaledBody extends BodyDecorator {
// 	#scale;
// 	constructor(scale, object) {
// 		super(object);
// 		this.#scale = throwIfNotInstance(scale, Vector2);
// 	}

// 	get size() {
// 		const size = super.size;
// 		return new Vector3(super.size.x * this.#scale.x, super.size.y * this.#scale.y, super.size.z);
// 	}
// }

// export class InteractiveBody extends BodyDecorator {
// 	#targets;
// 	#behavior = () => { }

// 	constructor(targets, behavior, object) {
// 		super(object);
// 		this.#targets = throwIfNotInstance(targets, Input);
// 		this.#behavior = behavior;
// 	}

// 	update() {
// 		super.update();
// 		const targets = this.#targets.get();
// 		targets.forEach(target => {
// 			this.#behavior(this, target);
// 		});
// 	}
// }
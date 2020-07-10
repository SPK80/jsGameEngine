import { Vector3 } from "../geometry/vectors.js";
import { BodyDecorator } from "./bodies.js";
import { throwIfNotInstance } from "../tools/utils.js";
import { Input } from "../inputs/input.js";

// export class DeltaPosBody extends BodyDecorator {
// 	#pred = new Vector3();
// 	get pos() {
// 		return new Vector3(
// 			this.pos.x,
// 			this.pos.y,
// 			this.pos.z
// 		).sub(this.#pred);
// 	}
// }

// export class DeltaSizeBody extends BodyDecorator {
// 	#pred = new Vector3();
// 	get size() {
// 		return new Vector3(
// 			this.pos.x,
// 			this.pos.y,
// 			this.pos.z
// 		).sub(this.#pred);
// 	}
// }

export class PhisicsBody extends BodyDecorator {
	#mass = 0;
	#deltaTime = 0.01;
	#velocity = new Vector3();
	get velocity(){return this.#velocity}
	#forces;

	constructor(forcesSource, deltaTime, mass, object) {
		super(object);
		this.#forces = throwIfNotInstance(forcesSource, Input);
		this.#deltaTime = deltaTime;
		this.#mass = mass;
	}

	update() {
		super.update();
		const forces = this.#forces.get();
		if (forces && forces.length > 0) {
			const force = new Vector3(); //force = 0
			forces.forEach(f => force.add(f)); //sum of all forces
			const accel = force.sub(1 / this.#mass);
			this.#velocity.add(accel.scMul(this.#deltaTime));
		}

		const dp = new Vector3(this.#velocity.x, this.#velocity.y, this.#velocity.z).
			scMul(this.#deltaTime);

		this.pos.add(dp);
	}
}
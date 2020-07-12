import { Vector3 } from "../../geometry/vectors.js";
import { BodyDecorator } from "../bodies.js";
import { throwIfNotInstance } from "../../tools/utils.js";
import { Input } from "../../inputs/input.js";

export class PhisicsBody extends BodyDecorator {
	#mass = 1;
	#deltaTime = 0.01;

	#velocity = new Vector3();
	get velocity() { return this.#velocity }

	#forces;
	get force() {
		const force = new Vector3(); //force = 0
		const forces = this.#forces.get();
		if (forces && forces.length > 0) {
			forces.forEach(f => force.add(f)); //sum of all forces			
			// console.log(force);
		}
		return force;
	}

	#resistance = 0.7;

	constructor(forcesSource, deltaTime, mass, object) {
		super(object);
		this.#forces = throwIfNotInstance(forcesSource, Input);
		this.#deltaTime = deltaTime;
		this.#mass = mass;
	}

	update() {
		super.update();
		const force = this.force;
		const fl = force.length;
		if (fl > 0) {
			const accel = force.scMul(1 / this.#mass);
			this.#velocity.add(accel.scMul(this.#deltaTime));
		}
		const dp = new Vector3(this.#velocity.x, this.#velocity.y, this.#velocity.z).
			scMul(this.#deltaTime);
		this.pos.add(dp);


		if (fl < 0.1)
			this.#velocity.scMul(this.#resistance);

		if (this.#velocity.length < 0.1)
			this.#velocity = new Vector3();
	}
}
import { Vector3 } from "../../geometry/vectors.js";
import { BodyDecorator } from "../bodies.js";
import { throwIfNotInstance } from "../../tools/utils.js";
import { Input } from "../../inputs/input.js";
import { DrawingDecorator, AnimDrawing } from "../drawings.js";

export class NonMassBody extends BodyDecorator {
	#maxSpeed = 100;
	#deltaTime = 0.001;
	get deltaTime() { return this.#deltaTime }

	#velocity = new Vector3();
	get velocity() { return this.#velocity }

	#pulses;
	get pulse() {
		const pulse = new Vector3(); //force = 0
		const pulses = this.#pulses.get();
		if (pulses && pulses.length > 0) {
			pulses.forEach(p => pulse.add(p)); //sum of all forces			
		}
		return pulse;
	}

	constructor(pulsesSource, deltaTime, maxSpeed, object) {
		super(object);
		this.#pulses = throwIfNotInstance(pulsesSource, Input);
		this.#deltaTime = deltaTime;
		this.#maxSpeed = maxSpeed;
	}

	_updatePos() {
		const dp = new Vector3(this.#velocity.x, this.#velocity.y, this.#velocity.z).
			scMul(this.#deltaTime);
		this.pos.add(dp);
	}

	_updateVelocity() {
		const pulse = this.pulse;
		if (pulse.length > 0) {
			pulse.scMul(this.#maxSpeed);
			this.#velocity = new Vector3(pulse.x, pulse.y, pulse.z);
		}
	}

	update() {
		super.update();
		this._updateVelocity();
		
		// if (this.#velocity.length < 0.1 && this.state.get() != 'idle') {
		// 	this.state.set('idle');
		// 	// this.#velocity = new Vector3();
		// 	console.log('idle');
		// }

		this._updatePos();
	}
}

export class MassBody extends NonMassBody {
	#mass = 1;

	constructor(forcesSource, deltaTime, mass, object) {
		super(forcesSource, deltaTime, 100, object);
		this.#mass = mass;
	}

	_updateVelocity() {
		const pulse = this.pulse;
		if (pulse.length > 0) {
			const dv = pulse.scMul(1 / this.#mass);
			this.velocity.add(dv);
		}
	}
}

export class PhisicsAnimDrawing extends AnimDrawing {
	update() {
		super.update();
	}
}
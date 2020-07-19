import { Vector3 } from "../../geometry/vectors.js";
import { BodyDecorator } from "../bodies.js";
import { throwIfNotInstance } from "../../tools/utils.js";
import { Input } from "../../inputs/input.js";
import { AnimDrawing } from "../drawings.js";
import { MoveStates, IdleStates } from "../state.js";

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

	#stateQualifier;

	constructor(pulsesSource, deltaTime, maxSpeed, object) {
		super(object);
		this.#pulses = throwIfNotInstance(pulsesSource, Input);
		this.#deltaTime = deltaTime;
		this.#maxSpeed = maxSpeed;
		this.#stateQualifier = new MoveStateQualifier(this.velocity, pulsesSource, 0.5);
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

	_updateState() {
		const newState = this.#stateQualifier.get();
		if (newState) {
			this.state.set(newState);
			// if (this.state == 'idle' && this.#velocity.length > 0) {
			// 	this.#velocity = new Vector3();
			// }
		}
	}

	update() {
		super.update();
		this._updateVelocity();
		this._updateState();
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

class MoveStateQualifier {
	#velocity;
	#pulses;
	#threshold = 0.001;

	constructor(velocity, pulsesSource, threshold = 0.1) {
		this.#velocity = velocity;
		this.#pulses = pulsesSource;
		this.#threshold = threshold;
	}

	get() {
		const v = this.#velocity;
		const ax = Math.abs(v.x);
		const ay = Math.abs(v.y);
		if (ax <= this.#threshold &&
			ay <= this.#threshold) {
			// console.log('idle');
			return IdleStates.idle;
		}

		const pulses = this.#pulses.get();
		if (pulses && pulses.length > 0) {
			const p = pulses[pulses.length - 1];

			if (p.x > this.#threshold) return MoveStates.moveRight;
			if (p.x < -this.#threshold) return MoveStates.moveLeft;
			if (p.y > this.#threshold) return MoveStates.moveDown;
			if (p.y < -this.#threshold) return MoveStates.moveUp;
		}
		// return 'idle';
		// if (ax > ay) {
		// 	if (v.x > this.#threshold) return 'moveRight';
		// 	if (v.x < -this.#threshold) return 'moveLeft';
		// }
		// else {
		// 	if (v.y > this.#threshold) return 'moveDown';
		// 	if (v.y < -this.#threshold) return 'moveUp';
		// }

	}
}
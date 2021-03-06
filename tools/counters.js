import { throwIfUndefined } from "./utils.js";

export class CircleCounter {
	#value = 0;
	#start = 0;
	#max = 10;
	#increment = 1;

	constructor(start, max, increment) {
		this.#start = start;
		this.#max = max;
		this.#increment = increment;
	}

	get next() {
		this.#value += this.#increment;
		if (this.#increment > 0)
			if (this.#value > this.#max) this.#value = this.#start;
			else if (this.#increment < 0)
				if (this.#value < this.#start) this.#value = this.#max;
		return this.#value;
	}
}

export class RolCounter {
	#value = 0;
	#start = 0;
	#max = 10;
	#increment = 1;

	constructor(start, max, increment) {
		this.#start = start;
		this.#max = max;
		this.#increment = increment;
	}

	get next() {
		this.#value += this.#increment;
		if (this.#value > this.#max || this.#value < this.#start) this.#increment = -this.#increment;

		return this.#value;
	}
}

class Counter {
	value = 0;
	start = 0;
	max = 10;
	increment = 1;

	constructor(start, max, increment) {
		this.start = start;
		this.max = max;
		this.increment = increment;
	}
	getNext() { throw ('calcNext not implemented') }
}


export class RndCounter extends Counter {
	#min;
	#max;
	constructor(min, max) {
		super();
		this.#min = throwIfUndefined(min, 'min');
		this.#max = throwIfUndefined(max, 'max');
	}
	getNext() {
		const rand = Math.round(this.#min - 0.5 + Math.random() * (this.#max - this.#min + 1));
		// console.log(rand);
		return rand;
	}
}
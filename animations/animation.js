import { throwIfUndefined, throwIfNotInstance } from "../tools/classUtils.js";
import { Counter } from "../tools/counters.js";

export class Animation {
	#frames;
	#order;
	// #cicled = false;
	#finished = false;
	constructor(frames, order) {
		this.#frames = throwIfUndefined(frames, 'frames');
		this.#order = throwIfNotInstance(order, Counter);
		// this.#cicled = cicled;
	}

	#position = -1;

	get reset() {
		this.#position = -1;
		this.#finished = false;
	}

	get next() {
		if (this.#finished) return;
		// console.log(this.#order);

		this.#position = this.#order.getNext();
		// if (this.#oredPos >= this.#order.length) {
		// 	this.#oredPos = 0;
		// 	if (!this.#cicled) {
		// 		this.#finished = true;
		// 		return;
		// 	}
		// }
		// const frame = this.#frames[this.#order[this.#oredPos]];
		// this.#oredPos++;
		return this.#frames[this.#position];

	}
}
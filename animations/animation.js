import { throwIfUndefined } from "../tools/classUtils.js";

export class Animation {
	#frames;
	#order;
	#cicled = false;
	#finished = false;
	constructor(frames, order, cicled = false) {
		this.#frames = throwIfUndefined(frames, 'frames');
		this.#order = throwIfUndefined(order, 'order');
		this.#cicled = cicled;
	}

	#oredPos = 0;

	get first() {
		this.#oredPos = 0;
		this.#finished = false;
		return this.#frames[this.#order[this.#oredPos]];
	}

	get next() {
		if (this.#finished) return;
		this.#oredPos++;
		if (this.#oredPos >= this.#order.length) {
			this.#oredPos = 0;
			if (!this.#cicled) {
				this.#finished = true;
				return;
			}
		}
		return this.#frames[this.#order[this.#oredPos]];
	}
}
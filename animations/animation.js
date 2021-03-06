import { throwIfUndefined } from "../tools/utils.js";

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

	get reset() {
		this.#oredPos = 0;
		this.#finished = false;
	}

	get next() {
		if (this.#finished) return;
		if (this.#oredPos >= this.#order.length) {
			this.#oredPos = 0;
			if (!this.#cicled) {
				this.#finished = true;
				return;
			}
		}
		const frame = this.#frames[this.#order[this.#oredPos]];
		this.#oredPos++;
		return frame;

	}
}
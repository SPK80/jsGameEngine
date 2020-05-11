import { throwIfUndefined } from "../tools/classUtils";

/// Interface
export class Animation {
	#frames;
	#order;
	#cicled = false;
	constructor(frames, order, cicled) {
		this.#frames = throwIfUndefined(frames, 'frames');
		this.#order = throwIfUndefined(order, 'order');
	}

	#current;
	get nextFrame() {
		this.#order
	}
}
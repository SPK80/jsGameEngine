import { throwIfUndefined } from "../tools/classUtils.js";

export class Frame {
	#x = 0;
	get x() { return this.#x; }

	#y = 0;
	get y() { return this.#y; }

	#wi = 0
	get wi() { return this.#wi; }

	#he = 0;
	get he() { return this.#he; }

	#delay = 0;
	get delay() { return this.#delay; }

	constructor(x, y, wi, he, delay) {
		this.#x = throwIfUndefined(x, 'x');
		this.#y = throwIfUndefined(y, 'y');
		this.#wi = throwIfUndefined(wi, 'wi');
		this.#he = throwIfUndefined(he, 'he');
		this.#delay = throwIfUndefined(delay, 'delay');
	}
}
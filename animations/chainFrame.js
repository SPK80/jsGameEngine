import { Frame } from "./frame.js";

export class ChainFrame extends Frame {

	#next;
	get next() { return this.#next; }

	addNext(x, y, wi, he, delay) {
		this.#next = new ChainFrame(x, y, wi, he, delay);
	}

}

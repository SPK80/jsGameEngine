import { IUpdating } from "./common.js";

export class Closer extends IUpdating {
	#body;
	#pos;
	get pos() {
		return this.#pos;
	}
	constructor(body) {
		this.#body = body;
	}

	update() {
		const v = this.#body.pos.sub(this.#pos);
		if (v.length > 1)
			this.#body.pos.add(v.scMul(0.1));
	}
}

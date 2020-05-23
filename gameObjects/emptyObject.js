import { Vector3 } from "../geometry/vectors";

export class EmptyObject {
	#name = '';
	get name() { return this.#name }

	#pos = new Vector3();
	get pos() { return this.#pos };

	#size = new Vector3();
	get size() { return this.#size };

	constructor(params) {
		if (params.name) this.#name = params.name;
		if (params.pos) this.#pos = params.pos;
		if (params.size) this.#size = params.size;
		if (params.render) this.#render = params.render;
	}
	#render;
	update(drivers) {
		this.#render.clear(this.#pos.x, this.#pos.y, this.#size.x, this.#size.y);
	}
}

class ControlledObject {

}
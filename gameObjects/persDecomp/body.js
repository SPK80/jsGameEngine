import { Vector3 } from "../../geometry/vectors.js";
import { UpdateDecorator } from "./interface.js";

export class Body extends UpdateDecorator {
	#pos;
	get pos() { return this.#pos }

	#size;
	get size() { return this.#size }

	constructor(x, y, wi, he) {
		// super(object);
		this.#pos = new Vector3(x, y, 0);
		this.#size = new Vector3(wi, he, 0);
	}

	update() {
		// this.object.update();
	}
}
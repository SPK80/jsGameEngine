import { ObjectDecorator } from "./objectDecorator.js";
import { Vector3 } from "../geometry/vectors.js";
import { throwIfNotInstance } from "../tools/utils.js";
import { Updatable } from "./objectInterface.js";

export class PositionObject extends ObjectDecorator {
	#pos = new Vector3();
	get pos() { return this.#pos };

	#size = new Vector3();
	get size() { return this.#size };

	constructor(pos, size, object) {
		super(throwIfNotInstance(object, Updatable));
		this.#pos = throwIfNotInstance(pos, Vector3);
		this.#size = throwIfNotInstance(size, Vector3);
	}
}
import { Updatable } from "./objectInterface.js";
import { throwIfNotInstance } from "../tools/utils.js";

export class ObjectDecorator extends Updatable {
	#object;
	get object() { return this.#object };

	constructor(object) {
		this.#object = throwIfNotInstance(object, Updatable);
	}
}
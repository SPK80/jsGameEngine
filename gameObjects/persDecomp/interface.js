import { throwIfNotInstance } from "../../tools/utils.js";

export class UpdateInterface {
	update() {
		throw ('update() must be implemented');
	}
}

export class UpdateDecorator extends UpdateInterface {
	#object;
	get object() { return this.#object };

	constructor(object) {
		super();
		this.#object = throwIfNotInstance(object, UpdateInterface);
	}
	//needed crutch for organization dependences
	property(name) {
		let result = this[name];
		if (result) return result;

		result = this.#object[name];
		if (result) return result;

		if (this.#object.field) {
			this.#object.property(name);
		}
	}
	update() {
		this.object.update();
	}
}

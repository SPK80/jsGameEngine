import { Composite } from "../gameObjects/composite.js";

export class Scene {

	#objects = new Composite();
	get objects() { return this.#objects }
	decorateObjects(_class, ...params) {
		if (!_class) throw (`${_class} must be defined`);
		this.#objects = new _class(...params, this.#objects);
	}

	#input;
	get input() { return this.#input }
	decorateInput(_class, ...params) {
		this.#input = new _class(...params, this.#input);
	}

	constructor(input) {
		this.#input = input;
	}
	update() {
		this.#objects.update();
	}
}

// class Decorated { //- bad idea? maybe...
// 	#object;
// 	get object() { return this.#object }

// 	constructor(object) {
// 		if (object == undefined) throw (`${object} must be defined`)
// 		this.#object = object;
// 	}

// 	decorate(_class, ...params) {
// 		//TODO: check for the class compatibility...
// 		this.#object = new _class(...params, this.#object);
// 	}
// }
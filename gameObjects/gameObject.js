import { throwIfUndefined, defaultIfUndefined } from "../tools/classUtils.js";
import { Vector3 } from "../geometry/vectors.js";

export class BaseObject {

	#name = '';
	get name() { return this.#name };

	constructor(params) {
		this.#name = throwIfUndefined(params.name, 'name');
	}

	update(drivers) { throw ('update must be implemented') }
}

export class GameObject extends BaseObject {
	#pos;
	get pos() { return this.#pos };
	// get pos() { return this.#pos.add(this.#parentPos) };

	// #x = 0;
	// get x() { return this.#x };
	// set x(value) { if (value != undefined) this.#x = value };

	// #y = 0;
	// get y() { return this.#y };
	// set y(value) { if (value != undefined) this.#y = value };

	// #z = 0;
	// get z() { return this.#z };
	// set z(value) { if (value != undefined) this.#z = value };

	constructor(params) {
		super(params);
		this.pos = new Vector3(
			defaultIfUndefined(params.x, 0),
			defaultIfUndefined(params.y, 0),
			defaultIfUndefined(params.z, 0)
		);
	}

	// #parentPos = new Vector3(0, 0, 0);

	// update(drivers) {
	// }
}